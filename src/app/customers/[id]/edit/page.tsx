'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Customer } from '../../components/types';
import { fetchCustomer, updateCustomer } from '../../components/customerUtils';
import CustomerEditForm from '../../components/CustomerEditForm';

const EditCustomerPage = ({ params }: { params: { id: string } }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCustomer = async () => {
      const data = await fetchCustomer(params.id);
      if (data) {
        setCustomer(data);
      } else {
        setError('Failed to fetch customer');
      }
      setIsLoading(false);
    };

    loadCustomer();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (customer) {
      const success = await updateCustomer(customer);
      if (success) {
        router.refresh();
        router.back();
      } else {
        setError('Failed to update customer');
      }
    }
  };

  const handleChange = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Customer</h1>
      <CustomerEditForm
        customer={customer}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditCustomerPage;
