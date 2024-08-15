import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { date, time, name, phone, email, service, hasPaid } = req.body;

    try {
      // Find or create the customer
      let customer = await prisma.customer.findUnique({
        where: { email },
      });

      if (!customer) {
        customer = await prisma.customer.create({
          data: { name, phone, email },
        });
      }

      // Find the service
      const serviceRecord = await prisma.service.findFirst({
        where: { name: service },
      });

      if (!serviceRecord) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Create the booking
      const bookedTime = new Date(`${date}T${time}:00Z`); // Convert date and time to DateTime format
      const booking = await prisma.booking.create({
        data: {
          bookedTime,
          serviceId: serviceRecord.id,
          customerId: customer.id,
          hasPaid,
        },
      });

      return res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the booking' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}