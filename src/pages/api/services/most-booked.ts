import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { period } = req.query;

    let dateFrom: Date;

    switch (period) {
      case 'weekly':
        dateFrom = new Date();
        dateFrom.setDate(dateFrom.getDate() - 7);
        break;
      case 'monthly':
        dateFrom = new Date();
        dateFrom.setMonth(dateFrom.getMonth() - 1);
        break;
      case 'yearly':
        dateFrom = new Date();
        dateFrom.setFullYear(dateFrom.getFullYear() - 1);
        break;
      default:
        return res.status(400).json({ message: 'Invalid period' });
    }

    // Query the most booked services within the date range
    const services = await prisma.service.findMany({
      where: {
        bookings: {
          some: {
            bookedTime: {
              gte: dateFrom,
            },
          },
        },
      },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: {
        bookings: {
          _count: 'desc',
        },
      },
      take: 5, 
    });

    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching most booked services:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
