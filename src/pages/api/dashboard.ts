import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { startOfMonth, format, addMonths, startOfDay } from 'date-fns';

interface RevenueData {
  month: Date;
  amount: string | number;
}

interface AppointmentData {
  month: Date;
  count: string | number;
}

interface PopularService {
  name: string;
  count: number;
}

// Helper function to safely convert BigInt to Number
const safelyConvertBigInt = (value: any): number => {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return value;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const revenueData = await getRevenueData();
      const appointmentsData = await getAppointmentsData();
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

async function getRevenueData() {
  try {
    const today = new Date();
    const currentMonth = startOfMonth(today);
    const threeMonthsAhead = addMonths(currentMonth, 3);

    const revenueData = await prisma.$queryRaw<RevenueData[]>`
      SELECT 
        DATE_TRUNC('month', series.month) as month,
        COALESCE(SUM(s.price), 0) as amount
      FROM 
        generate_series(
          ${currentMonth}::timestamp, 
          ${threeMonthsAhead}::timestamp, 
          '1 month'::interval
        ) as series(month)
      LEFT JOIN 
        "Booking" b ON DATE_TRUNC('month', b."bookedTime") = DATE_TRUNC('month', series.month)
      LEFT JOIN 
        "Service" s ON b."serviceId" = s.id
      GROUP BY 
        DATE_TRUNC('month', series.month)
      ORDER BY 
        DATE_TRUNC('month', series.month) ASC
    `;

    return revenueData.map((item) => ({
      month: format(item.month, 'MMM'),
      amount: safelyConvertBigInt(item.amount),
    }));
  } catch (error) {
    console.error('Error in getRevenueData:', error);
    throw error;
  }
}

async function getAppointmentsData() {
  try {
    const today = new Date();
    const currentMonth = startOfMonth(today);
    const threeMonthsAhead = addMonths(currentMonth, 3);

    const appointmentsData = await prisma.$queryRaw<AppointmentData[]>`
      SELECT 
        DATE_TRUNC('month', series.month) as month,
        COALESCE(COUNT(b.id), 0) as count
      FROM 
        generate_series(
          ${currentMonth}::timestamp, 
          ${threeMonthsAhead}::timestamp, 
          '1 month'::interval
        ) as series(month)
      LEFT JOIN 
        "Booking" b ON DATE_TRUNC('month', b."bookedTime") = DATE_TRUNC('month', series.month)
      GROUP BY 
        DATE_TRUNC('month', series.month)
      ORDER BY 
        DATE_TRUNC('month', series.month) ASC
    `;

    return appointmentsData.map((item) => ({
      month: format(item.month, 'MMM'),
      count: safelyConvertBigInt(item.count),
    }));
  } catch (error) {
    console.error('Error in getAppointmentsData:', error);
    throw error;
  }
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

async function getPopularService(): Promise<PopularService> {
  try {
    const result = await prisma.$queryRaw<PopularService[]>`
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