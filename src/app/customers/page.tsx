import React from 'react';
import Layout from '../../components/layout';
import CustomerTable from './components/CustomerTable';
import { fetchCustomers } from './components/customerUtils';

export const revalidate = 0;

// Fetching data directly in the server component
export default async function CustomerListPage() {
  const customers = await fetchCustomers();

  return (
    <Layout>
      <div className='p-5'>
        <h1 className='text-2xl font-bold mb-4'>Customer List</h1>
        <CustomerTable customers={customers} />
      </div>
    </Layout>
  );
}
