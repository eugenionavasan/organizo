'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Customer = {
  id: number;
  name: string;
  tel: string;
  service: string;
};

const mockCustomers: Customer[] = [
  { id: 1, name: 'John Doe', tel: '123-456-7890', service: 'Web Development' },
  { id: 2, name: 'Jane Smith', tel: '987-654-3210', service: 'Graphic Design' },
  {
    id: 3,
    name: 'Alice Johnson',
    tel: '555-123-4567',
    service: 'SEO Optimization',
  },
];

const EditCustomerPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const customerToEdit = mockCustomers.find(
      (c) => c.id === parseInt(params.id)
    );
    if (customerToEdit) {
      setCustomer(customerToEdit);
    } else {
      router.push('/customers'); // Redirect if the customer is not found
    }
  }, [params.id, router]);

  const handleSave = () => {
    // Mock save logic
    alert('Customer details saved!');
    router.push('/customers');
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Customer: {customer.name}</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Name:
          <input
            type='text'
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Telephone:
          <input
            type='text'
            value={customer.tel}
            onChange={(e) => setCustomer({ ...customer, tel: e.target.value })}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Service:
          <input
            type='text'
            value={customer.service}
            onChange={(e) =>
              setCustomer({ ...customer, service: e.target.value })
            }
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default EditCustomerPage;
