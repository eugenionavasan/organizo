import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDateRanges = (range: string) => {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));

  switch (range) {
    case 'daily':
      return [startOfDay, new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)];
    case 'weekly':
      const startOfWeek = new Date(startOfDay);
      startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
      return [startOfWeek, new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000)];
    case 'monthly':
      const startOfMonth = new Date(startOfDay);
      startOfMonth.setDate(1);
      return [startOfMonth, new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0, 23, 59, 59, 999)];
    default:
      return [startOfDay, new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)];
  }
};

const getAppointmentsCount = async (start: Date, end: Date) => {
  const appointments = await prisma.booking.count({
    where: {
      bookedTime: {
        gte: start,
        lt: end,
      },
    },
  });

  return appointments;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { range } = req.query;

  if (!range || !['daily', 'weekly', 'monthly'].includes(range as string)) {
    return res.status(400).json({ message: 'Invalid range' });
  }

  const [start, end] = getDateRanges(range as string);

  try {
    const appointmentsCount = await getAppointmentsCount(start, end);

    res.status(200).json({
      name: range,
      appointments: appointmentsCount,
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
