import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerEditForm from '../components/CustomerEditForm';

describe('CustomerEditForm', () => {
  const mockCustomer = {
    id: '1',
    name: 'John Doe',
    phone: '123-456-7890',
    email: 'john@example.com',
  };

  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(
      <CustomerEditForm
        customer={mockCustomer}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
      />
    );
  });

  it('renders the form with customer data', () => {
    expect(screen.getByLabelText('Name:')).toHaveValue(mockCustomer.name);
    expect(screen.getByLabelText('Telephone:')).toHaveValue(mockCustomer.phone);
    expect(screen.getByLabelText('Email:')).toHaveValue(mockCustomer.email);
  });

  it('calls onChange when input values change', () => {
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockCustomer,
      name: 'Jane Doe',
    });
  });

  it('calls onSubmit when form is submitted', () => {
    const submitButton = screen.getByText('Save');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
