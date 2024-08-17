import prisma from './prismaClient';
import { FormattedCustomer } from './types';

// Fetch customers and their latest bookings
export const fetchCustomers = async (): Promise<FormattedCustomer[]> => {
  const customers = await prisma.customer.findMany({
    include: {
      bookings: {
        include: {
          service: true,
        },
        orderBy: {
          bookedTime: 'desc',
        },
        take: 1,
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    service: customer.bookings[0]?.service.name || 'No service booked',
  }));
};
