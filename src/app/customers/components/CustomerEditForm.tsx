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
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Name:
          <input
            type='text'
            value={customer.name}
            onChange={(e) => onChange({ ...customer, name: e.target.value })}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Telephone:
          <input
            type='text'
            value={customer.phone}
            onChange={(e) => onChange({ ...customer, phone: e.target.value })}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Email:
          <input
            type='text'
            value={customer.email}
            onChange={(e) => onChange({ ...customer, email: e.target.value })}
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
  );
};

export default CustomerEditForm;
