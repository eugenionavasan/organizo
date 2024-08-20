import { useState, useEffect } from 'react';
import { ServiceType } from '../types/types';
import { SERVICE_PRICES } from '../constants/constants';

export const useBookingForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<ServiceType>('haircut');
  const [paymentOption, setPaymentOption] = useState<'now' | 'later'>('now');
  const [price, setPrice] = useState<number>(SERVICE_PRICES.haircut);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    setPrice(SERVICE_PRICES[service]);
  }, [service]);

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setService('haircut');
    setPaymentOption('now');
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    service,
    setService,
    paymentOption,
    setPaymentOption,
    price,
    bookingSuccess,
    setBookingSuccess,
    isProcessing,
    setIsProcessing,
    paymentError,
    setPaymentError,
    resetForm,
  };
};
