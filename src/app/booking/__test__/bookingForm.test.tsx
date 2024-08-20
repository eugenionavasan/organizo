import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingForm } from '../components/bookingForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import * as BookingFormHelpers from '../helpers/BookingFormHelpers';

const mockOnBooking = jest.fn();
const mockOnTimeBooked = jest.fn();

jest.mock('../helpers/BookingFormHelpers', () => ({
  bookAppointment: jest.fn(async (date, time, name, phone, email, service, hasPaid, setBookingSuccess, setPaymentError, onTimeBooked, onBooking) => {
    setBookingSuccess(true);
    onTimeBooked(time);
    onBooking(date, time);
    return Promise.resolve();
  }),
  processPayment: jest.fn(),
  createPaymentIntent: jest.fn(),
}));

jest.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useStripe: () => ({ createPaymentMethod: jest.fn() }),
  useElements: () => ({ getElement: jest.fn() }),
  CardElement: () => <div data-testid="card-element" />,
}));

jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(),
}));

const mockDate = new Date('2024-01-01');
const mockTime = '10:00';

const renderBookingForm = () => {
  render(
    <Elements stripe={loadStripe('mock_key')}>
      <BookingForm
        date={mockDate}
        time={mockTime}
        onBooking={mockOnBooking}
        bookedTimes={[]}
        onTimeBooked={mockOnTimeBooked}
      />
    </Elements>
  );
};

// Helper function to get input by label text
const getInputByLabelText = (labelText: string) => {
  const label = screen.getByText(labelText);
  return label.nextElementSibling as HTMLElement;
};

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders booking form with all fields', () => {
    renderBookingForm();
    
    expect(screen.getByText('Your appointment')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Payment Option')).toBeInTheDocument();
    expect(screen.getByText('Book Appointment')).toBeInTheDocument();
  });

  test('allows user to fill out the form', () => {
    renderBookingForm();
    
    const nameInput = getInputByLabelText('Name');
    const phoneInput = getInputByLabelText('Phone');
    const emailInput = getInputByLabelText('Email');
    const serviceSelect = getInputByLabelText('Service');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(serviceSelect, { target: { value: 'haircut' } });
    
    expect(nameInput).toHaveValue('John Doe');
    expect(phoneInput).toHaveValue('1234567890');
    expect(emailInput).toHaveValue('john@example.com');
    expect(serviceSelect).toHaveValue('haircut');
  });

  test('displays payment section when "Pay Now" is selected', () => {
    renderBookingForm();
    
    const paymentOptionSelect = getInputByLabelText('Payment Option');
    fireEvent.change(paymentOptionSelect, { target: { value: 'now' } });
    
    expect(screen.getByTestId('card-element')).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    renderBookingForm();
    
    fireEvent.change(getInputByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getInputByLabelText('Phone'), { target: { value: '1234567890' } });
    fireEvent.change(getInputByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getInputByLabelText('Service'), { target: { value: 'haircut' } });
    fireEvent.change(getInputByLabelText('Payment Option'), { target: { value: 'later' } });

    fireEvent.click(screen.getByText('Book Appointment'));

    await waitFor(() => {
      expect(screen.getByText('Your appointment has been booked successfully!')).toBeInTheDocument();
    });

    expect(BookingFormHelpers.bookAppointment).toHaveBeenCalled();
    expect(mockOnBooking).toHaveBeenCalledWith(mockDate, mockTime);
    expect(mockOnTimeBooked).toHaveBeenCalledWith(mockTime);
  });
});