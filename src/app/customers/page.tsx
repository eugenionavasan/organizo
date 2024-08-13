'use client';

import { useRouter } from 'next/navigation';

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

const CustomerListPage: React.FC = () => {
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/customers/${id}/edit`);
  };

  return (
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
          {mockCustomers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {customer.name}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {customer.tel}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {customer.service}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleEdit(customer.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerListPage;
