'use client';

import React, { useState } from 'react';
import Calendar from '../../components/calendar/calendar';
import TimeSlots from '../../components/calendar/timeSlots';
import BookingSummary from '../../components/calendar/bookingSummary';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const price = 100.0;

  return (
    <div>
      <h1>Book Your Session</h1>
      <Calendar onSelectDate={setSelectedDate} />
      {selectedDate && <TimeSlots onSelectTime={setSelectedTime} />}
      <BookingSummary date={selectedDate} time={selectedTime} price={price} />
      <button>Next</button>
    </div>
  );
};

export default App;
