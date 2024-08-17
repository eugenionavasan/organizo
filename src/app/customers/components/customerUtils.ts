import prisma from '../../../components/prismaClient';
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

// Fetch a customer by ID
import { Customer } from './types';

export const fetchCustomer = async (id: string): Promise<Customer | null> => {
  try {
    const response = await fetch(`/api/customers/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch customer');
      return null;
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
};

// Update a customer
export const updateCustomer = async (customer: Customer): Promise<boolean> => {
  try {
    const response = await fetch(`/api/customers/${customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });

    if (response.ok) {
      return true;
    } else {
      console.error('Failed to update customer');
      return false;
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    return false;
  }
};
