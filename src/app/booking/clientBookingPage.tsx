"use client";

import React, { useState } from "react";
import Layout from "../../components/layout";
import Calendar from "./components/calendar";
import TimeSlots from "./components/timeSlots";
import BookingForm from "./components/bookingForm";
import StripeWrapper from "./components/stripeWrapper";

const ClientBookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<{ [key: string]: string[] }>(
    {}
  );

  const handleBooking = (date: Date, time: string) => {
    setBookedTimes((prev) => {
      const dateString = date.toISOString().split("T")[0];
      return {
        ...prev,
        [dateString]: [...(prev[dateString] || []), time],
      };
    });
  };

  return (
    <Layout>
      <StripeWrapper>
        <div className="booking-container flex flex-col lg:flex-row gap-8 p-4 bg-gray-100 min-h-screen">
          <div className="w-full lg:w-1/3">
            <Calendar onSelectDate={setSelectedDate} />
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Select a Date and Time
            </h2>
            <TimeSlots
              selectedDate={selectedDate}
              onSelectTime={setSelectedTime}
              bookedTimes={
                bookedTimes[selectedDate.toISOString().split("T")[0]] || []
              }
            />
          </div>
          <div className="w-full lg:w-1/3">
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
