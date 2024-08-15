// src/app/customers/[id]/edit/page.tsx

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

async function getCustomerData(id: string): Promise<Customer | null> {
  return await prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
    },
  });
}

const EditCustomerPage = async ({ params }: { params: { id: string } }) => {
  const customer = await getCustomerData(params.id);

  if (!customer) {
    redirect('/customers');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Customer</h1>
      <form action={`/api/customers/${customer.id}`} method='POST'>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Name:
            <input
              type='text'
              name='name'
              defaultValue={customer.name}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Telephone:
            <input
              type='text'
              name='phone'
              defaultValue={customer.phone}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Email:
            <input
              type='text'
              name='email'
              defaultValue={customer.email}
              style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
            />
          </label>
        </div>
        <button
          type='submit'
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditCustomerPage;
