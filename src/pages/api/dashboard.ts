import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths, format, addMonths, startOfDay, addWeeks } from 'date-fns';

type TimePeriod = 'weekly' | 'monthly' | 'fourMonths' | 'yearly';

interface DataPoint {
  label: string;
  value: number;
}

const safelyConvertBigInt = (value: any): number => {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return value;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { revenuePeriod = 'fourMonths', appointmentsPeriod = 'fourMonths' } = req.query;

      const revenueData = await getRevenueData(revenuePeriod as TimePeriod);
      const appointmentsData = await getAppointmentsData(appointmentsPeriod as TimePeriod);
      const upcomingAppointments = await getUpcomingAppointments();
      const popularService = await getPopularService();

      res.status(200).json({
        revenue: revenueData,
        appointments: appointmentsData,
        upcomingAppointments: upcomingAppointments,
        popularService: popularService,
      });
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching dashboard data'});
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getRevenueData(period: TimePeriod): Promise<DataPoint[]> {
  const { startDate, endDate, intervalString, formatString } = getDateRangeAndFormat(period);

  const revenueData = await prisma.$queryRaw<{ date: Date; amount: bigint }[]>`
    SELECT 
      series.date,
      COALESCE(SUM(s.price), 0) as amount
    FROM 
      generate_series(
        ${startDate}::timestamp, 
        ${endDate}::timestamp, 
        ${`1 ${intervalString}`}::interval
      ) as series(date)
    LEFT JOIN 
      "Booking" b ON DATE_TRUNC(${intervalString}, b."bookedTime") = DATE_TRUNC(${intervalString}, series.date)
    LEFT JOIN 
      "Service" s ON b."serviceId" = s.id
    GROUP BY 
      series.date
    ORDER BY 
      series.date ASC
  `;

  return revenueData.map((item) => ({
    label: format(item.date, formatString),
    value: safelyConvertBigInt(item.amount),
  }));
}

async function getAppointmentsData(period: TimePeriod): Promise<DataPoint[]> {
  const { startDate, endDate, intervalString, formatString } = getDateRangeAndFormat(period);

  const appointmentsData = await prisma.$queryRaw<{ date: Date; count: bigint }[]>`
    SELECT 
      series.date,
      COALESCE(COUNT(b.id), 0) as count
    FROM 
      generate_series(
        ${startDate}::timestamp, 
        ${endDate}::timestamp, 
        ${`1 ${intervalString}`}::interval
      ) as series(date)
    LEFT JOIN 
      "Booking" b ON DATE_TRUNC(${intervalString}, b."bookedTime") = DATE_TRUNC(${intervalString}, series.date)
    GROUP BY 
      series.date
    ORDER BY 
      series.date ASC
  `;

  return appointmentsData.map((item) => ({
    label: format(item.date, formatString),
    value: safelyConvertBigInt(item.count),
  }));
}

function getDateRangeAndFormat(period: TimePeriod): { startDate: Date; endDate: Date; intervalString: string; formatString: string } {
  const now = new Date();
  let startDate: Date;
  let endDate: Date;
  let intervalString: string;
  let formatString: string;

  switch (period) {
    case 'weekly':
      startDate = startOfWeek(now);
      endDate = addWeeks(startDate, 1);
      intervalString = 'day';
      formatString = 'EEE';
      break;
    case 'monthly':
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
      intervalString = 'day';
      formatString = 'dd';
      break;
    case 'fourMonths':
      startDate = startOfMonth(now);
      endDate = addMonths(startDate, 3);
      intervalString = 'month';
      formatString = 'MMM';
      break;
    case 'yearly':
      startDate = startOfYear(now);
      endDate = endOfYear(now);
      intervalString = 'month';
      formatString = 'MMM';
      break;
    default:
      throw new Error('Invalid time period');
  }

  return { startDate, endDate, intervalString, formatString };
}

async function getUpcomingAppointments() {
  try {
    const today = new Date();
    const threeMonthsAhead = addMonths(today, 3);
    
    const upcomingAppointments = await prisma.booking.findMany({
      where: {
        bookedTime: {
          gte: startOfDay(today),
          lt: startOfDay(threeMonthsAhead),
        },
      },
      include: {
        customer: true,
        service: true,
      },
      orderBy: {
        bookedTime: 'asc',
      },
      take: 5, // Limit to 5 upcoming appointments
    });

    return upcomingAppointments.map((appointment) => ({
      id: appointment.id,
      name: appointment.customer.name,
      date: format(appointment.bookedTime, 'yyyy-MM-dd'),
      time: format(appointment.bookedTime, 'h:mm a'),
      service: appointment.service.name,
      hasPaid: appointment.hasPaid,
    }));
  } catch (error) {
    console.error('Error in getUpcomingAppointments:', error);
    throw error;
  }
}

async function getPopularService() {
  try {
    const result = await prisma.$queryRaw<{ name: string; count: bigint }[]>`
      SELECT 
        s.name,
        COUNT(*) as count
      FROM 
        "Booking" b
      JOIN 
        "Service" s ON b."serviceId" = s.id
      GROUP BY 
        s.id, s.name
      ORDER BY 
        count DESC
      LIMIT 1
    `;

    if (result.length === 0) {
      return { name: 'No services booked', count: 0 };
    }

    return {
      name: result[0].name,
      count: safelyConvertBigInt(result[0].count),
    };
  } catch (error) {
    console.error('Error in getPopularService:', error);
    throw error;
  }
}