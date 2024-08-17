import Link from 'next/link';
import { FormattedCustomer } from './types';

type CustomerTableProps = {
  customers: FormattedCustomer[];
};

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  return (
    <table className='w-full border-collapse mt-5'>
      <thead>
        <tr>
          <th className='border border-gray-300 px-4 py-2 text-left'>Name</th>
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
        {customers.map((customer) => (
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
  );
};

export default CustomerTable;
