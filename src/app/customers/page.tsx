import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Layout from '../../components/layout';

const prisma = new PrismaClient();

const CustomerListPage = async () => {
  const customers = await prisma.customer.findMany({
    include: {
      bookings: {
        include: {
          service: true,
        },
        orderBy: {
          bookedTime: 'desc',
        },
        take: 1, // Get the latest booking for each customer
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
      <div style={{ padding: '20px' }}>
        <h1>Customer List</h1>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                Telephone
              </th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                Service
              </th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {formattedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {customer.name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {customer.phone}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {customer.service}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <Link href={`/customers/${customer.id}/edit`}>
                    <button
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
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
};

export default CustomerListPage;
