import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { parseISO } from 'date-fns';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { date, time, name, phone, email, service, hasPaid } = req.body;

    try {
      // Find or create customer
      let customer = await prisma.customer.findUnique({
        where: { email },
      });

      if (!customer) {
        customer = await prisma.customer.create({
          data: { name, phone, email },
        });
      }

      // Find service
      const serviceRecord = await prisma.service.findFirst({
        where: { name: service },
      });

      if (!serviceRecord) {
        return res.status(404).json({ error: 'Service not found' });
      }

      // Parse the date and time strings into a valid Date object
      const bookedTime = parseISO(`${date}T${time}`);

      if (isNaN(bookedTime.getTime())) {
        return res.status(400).json({ error: 'Invalid date or time provided' });
      }

      // Create booking
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