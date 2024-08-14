'use client';

import React, { useState } from 'react';
import Layout from '../../components/layout';
import Calendar from './components/calendar';
import TimeSlots from './components/timeSlots';
import BookingForm from './components/bookingForm';
import StripeWrapper from './components/stripeWrapper';

const ClientBookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<{ [key: string]: string[] }>({});

  const handleBooking = (date: Date, time: string) => {
    setBookedTimes(prev => {
      const dateString = date.toISOString().split('T')[0];
      return {
        ...prev,
        [dateString]: [...(prev[dateString] || []), time]
      };
    });
  };

  return (
    <Layout>
      <StripeWrapper>
        <div className='booking-container flex gap-8 p-8 bg-gray-100 min-h-screen'>
          <div className='w-1/2'>
            <Calendar onSelectDate={setSelectedDate} />
          </div>
          <div className='w-1/4'>
            <h2 className="text-xl font-semibold mb-4">Select a Date and Time</h2>
            <TimeSlots
              selectedDate={selectedDate}
              onSelectTime={setSelectedTime}
              bookedTimes={bookedTimes[selectedDate.toISOString().split('T')[0]] || []}
            />
          </div>
          <div className='w-1/4'>
            <BookingForm
              date={selectedDate}
              time={selectedTime}
              onBooking={handleBooking}
            />
          </div>
        </div>
      </StripeWrapper>
    </Layout>
  );
};

export default ClientBookingPage;