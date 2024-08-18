import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerTable from '../components/CustomerTable';

describe('CustomerTable', () => {
  const mockCustomers = [
    {
      id: 'cla1b2c3d4e5f6g7h8i9j0',
      name: 'John Doe',
      phone: '123-456-7890',
      service: 'Haircut',
    },
    {
      id: 'clk5l6m7n8o9p0q1r2s3t4',
      name: 'Jane Smith',
      phone: '098-765-4321',
      service: 'Manicure',
    },
  ];

  it('renders the table with customer data', () => {
    render(<CustomerTable customers={mockCustomers} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Telephone')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();

    mockCustomers.forEach((customer) => {
      expect(screen.getByText(customer.name)).toBeInTheDocument();
      expect(screen.getByText(customer.phone)).toBeInTheDocument();
      expect(screen.getByText(customer.service)).toBeInTheDocument();
    });

    // Check that we have the correct number of "Edit" buttons
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons).toHaveLength(mockCustomers.length);
  });
});
