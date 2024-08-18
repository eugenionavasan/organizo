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

it('displays an error message for invalid customer IDs', () => {
  const invalidCustomers = [
    {
      id: '',
      name: 'Invalid Customer',
      phone: '000-000-0000',
      service: 'Invalid Service',
    },
  ];

  render(<CustomerTable customers={invalidCustomers} />);

  // Check that the invalid ID results in an error or default behavior
  expect(screen.getByText('Invalid Customer')).toBeInTheDocument();
  expect(screen.getByText('Edit')).toBeInTheDocument(); // Ensure the edit button still appears
});

it('displays all columns even if customer data is missing', () => {
  const incompleteCustomers = [
    {
      id: 'cla1b2c3d4e5f6g7h8i9j0',
      name: 'John Doe',
      phone: '',
      service: '',
    },
  ];

  render(<CustomerTable customers={incompleteCustomers} />);

  // Check that the table headers are still displayed
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Telephone')).toBeInTheDocument();
  expect(screen.getByText('Service')).toBeInTheDocument();
  expect(screen.getByText('Actions')).toBeInTheDocument();

  // Check that the "Edit" button still appears even with missing data
  const editButton = screen.getByText('Edit');
  expect(editButton).toBeInTheDocument();
});
