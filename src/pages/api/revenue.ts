import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { type } = req.query;

  try {
    let revenueData;

    // Function to calculate revenue
    const calculateRevenue = (bookings: any[]) =>
      bookings.reduce((acc, booking) => acc + booking.service.price, 0);

    if (type === 'weekly') {
      // Fetch weekly bookings
      const bookings = await prisma.booking.findMany({
        where: {
          bookedTime: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Last 7 days
          },
        },
        include: {
          service: true, // Include service details to get the price
        },
      });

      revenueData = [
        {
          name: 'Last 7 Days',
          revenue: calculateRevenue(bookings),
        },
      ];
    } else if (type === 'monthly') {
      // Fetch monthly bookings
      const bookings = await prisma.booking.findMany({
        where: {
          bookedTime: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Last month
          },
        },
        include: {
          service: true,
        },
      });

      revenueData = [
        {
          name: 'Last 30 Days',
          revenue: calculateRevenue(bookings),
        },
      ];
    } else if (type === 'yearly') {
      // Fetch yearly bookings
      const bookings = await prisma.booking.findMany({
        where: {
          bookedTime: {
            gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // Last year
          },
        },
        include: {
          service: true,
        },
      });

      revenueData = [
        {
          name: 'Last 12 Months',
          revenue: calculateRevenue(bookings),
        },
      ];
    } else if (type === 'total') {
      // Fetch all-time bookings
      const bookings = await prisma.booking.findMany({
        include: {
          service: true,
        },
      });

      revenueData = [
        {
          name: 'All Time',
          revenue: calculateRevenue(bookings),
        },
      ];
    } else {
      return res.status(400).json({ message: 'Invalid type' });
    }

    return res.status(200).json(revenueData);
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
