'use client'

import React, { useState } from 'react';
import Calendar from './components/calendar';
import TimeSlots from './components/timeSlots';
import BookingSummary from './components/bookingSummary';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const price = 20.0;

  return (
    <div className="booking-container flex gap-8 p-8 bg-gray-100 min-h-screen">
      <div className="w-1/2">
        <Calendar onSelectDate={setSelectedDate} />
      </div>
      <div className="w-1/4">
        <TimeSlots selectedDate={selectedDate} onSelectTime={setSelectedTime} />
      </div>
      <div className="w-1/4 flex flex-col justify-between">
        <BookingSummary date={selectedDate} time={selectedTime} price={price} />
      </div>
    </div>
  );
};

export default App;