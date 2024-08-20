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

  try {
    // Fetch upcoming bookings, including related customer and service data
    const bookings = await prisma.booking.findMany({
      where: {
        bookedTime: {
          gte: new Date(), // Fetch only future appointments
        },
      },
      orderBy: {
        bookedTime: 'asc', // Order by appointment time
      },
      include: {
        customer: true, // Include customer details
        service: true,  // Include service details
      },
    });

    const appointments = bookings.map(booking => ({
      clientName: booking.customer.name,
      appointmentDate: booking.bookedTime.toISOString(),
      appointmentTimeWindow: `${formatTime(booking.bookedTime)} - ${formatTime(new Date(booking.bookedTime.getTime() + 60 * 60 * 1000))}`, // Assuming 1-hour slots
      paymentStatus: booking.hasPaid ? 'Paid' : 'Pending',
    }));

    return res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// format time
function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
}
