import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Layout from '../../components/layout';

const prisma = new PrismaClient();

// Fetching data directly in the server component
export default async function CustomerListPage() {
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
  });

  const formattedCustomers = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    service: customer.bookings[0]?.service.name || 'No service booked',
  }));

  return (
    <Layout>
      <div className='p-5'>
        <h1 className='text-2xl font-bold mb-4'>Customer List</h1>
        <table className='w-full border-collapse mt-5'>
          <thead>
            <tr>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Name
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Telephone
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Service
              </th>
              <th className='border border-gray-300 px-4 py-2 text-left'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {formattedCustomers.map((customer) => (
              <tr key={customer.id} className='hover:bg-gray-100'>
                <td className='border border-gray-300 px-4 py-2'>
                  {customer.name}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {customer.phone}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {customer.service}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  <Link href={`/customers/${customer.id}/edit`}>
                    <button className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700'>
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
