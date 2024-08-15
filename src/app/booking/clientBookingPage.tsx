'use client';

import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import Layout from '../../components/layout';
import Calendar from './components/calendar';
import TimeSlots from './components/timeSlots';
import BookingForm from './components/bookingForm';
import StripeWrapper from './components/stripeWrapper';

const ClientBookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const bookings = await response.json();

        const formattedBookings: { [key: string]: string[] } = {};

        bookings.forEach((booking: { bookedTime: string }) => {
          const localDateTime = toZonedTime(parseISO(booking.bookedTime), Intl.DateTimeFormat().resolvedOptions().timeZone);
          const dateString = format(localDateTime, 'yyyy-MM-dd');
          const timeString = format(localDateTime, 'HH:mm');
          
          if (formattedBookings[dateString]) {
            formattedBookings[dateString].push(timeString);
          } else {
            formattedBookings[dateString] = [timeString];
          }
        });

        setBookedTimes(formattedBookings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  const handleBooking = (date: Date, time: string) => {
    setBookedTimes(prev => {
      const dateString = format(date, 'yyyy-MM-dd');
      return {
        ...prev,
        [dateString]: [...(prev[dateString] || []), time]
      };
    });
  };

  const handleTimeBooked = (time: string) => {
    if (selectedDate) {
      handleBooking(selectedDate, time);
    }
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
              bookedTimes={bookedTimes[format(selectedDate, 'yyyy-MM-dd')] || []}
            />
          </div>
          <div className='w-1/4'>
            <BookingForm
              date={selectedDate}
              time={selectedTime}
              onBooking={handleBooking}
              bookedTimes={bookedTimes[format(selectedDate, 'yyyy-MM-dd')] || []}
              onTimeBooked={handleTimeBooked}
            />
          </div>
        </div>
      </StripeWrapper>
    </Layout>
  );
};

export default ClientBookingPage;