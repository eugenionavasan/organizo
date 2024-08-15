import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const bookings = await prisma.booking.findMany({
        select: {
          bookedTime: true,
          // Add more fields if needed
        },
      });

      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}