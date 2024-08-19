import { ServiceType } from '../types/types';
import { formatDate, formatTime } from '../utils/formatDate';
import { CardElement } from '@stripe/react-stripe-js';

export const processPayment = async (stripe: any, elements: any, amount: number, setPaymentError: (error: string | null) => void) => {
  const cardElement = elements.getElement(CardElement);

  if (!cardElement) {
    setPaymentError('Card element not found');
    return false;
  }

  try {
    const { clientSecret } = await createPaymentIntent(amount);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement }
    });

    if (result.error) {
      setPaymentError(result.error.message || 'Payment failed');
      return false;
    } else if (result.paymentIntent.status === 'succeeded') {
      return true;
    }
  } catch (error) {
    setPaymentError('An error occurred during payment processing');
    return false;
  }

  return false;
};

export const createPaymentIntent = async (amount: number) => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amount * 100 })
  });

  if (!response.ok) {
    throw new Error('Failed to create payment intent');
  }

  return response.json();
};

export const bookAppointment = async (
  date: Date,
  time: string,
  name: string,
  phone: string,
  email: string,
  service: ServiceType,
  hasPaid: boolean,
  setBookingSuccess: (success: boolean) => void,
  setPaymentError: (error: string | null) => void,
  onTimeBooked: (time: string) => void,
  onBooking: (date: Date, time: string) => void,
  resetForm: () => void
) => {
  try {
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);

    if (!formattedDate || !formattedTime) {
      throw new Error('Invalid date or time provided');
    }

    const response = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: formattedDate,
        time: formattedTime,
        name,
        phone,
        email,
        service,
        hasPaid,
      }),
    });

    if (response.ok) {
      setBookingSuccess(true);
      onTimeBooked(time);
      onBooking(date, time);
      resetForm();
    } else {
      const { error } = await response.json();
      throw new Error(error || 'An error occurred during booking');
    }
  } catch (error) {
    setPaymentError(error instanceof Error ? error.message : 'An error occurred during booking');
    setBookingSuccess(false);
  }
};