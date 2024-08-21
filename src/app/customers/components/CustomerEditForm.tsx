import React from 'react';
import { Customer } from './types';

type CustomerEditFormProps = {
  customer: Customer;
  onChange: (updatedCustomer: Customer) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const CustomerEditForm: React.FC<CustomerEditFormProps> = ({
  customer,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Name:
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange({ ...customer, name: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Telephone:
          <input
            type="text"
            value={customer.phone}
            onChange={(e) => onChange({ ...customer, phone: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Email:
          <input
            type="email"
            value={customer.email}
            onChange={(e) => onChange({ ...customer, email: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="flex justify-start">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CustomerEditForm;
