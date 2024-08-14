'use client'

import React, { useState } from 'react';

const TimeSlots: React.FC<{ 
  selectedDate: Date; 
  onSelectTime: (time: string) => void;
  bookedTimes: string[];
}> = ({ selectedDate, onSelectTime, bookedTimes }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const generateTimeSlots = () => {
    const times = [];
    const startHour = 9;
    const endHour = 20; 
    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return times;
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  return (
    <div className="time-slots grid grid-cols-2 gap-2">
      {generateTimeSlots().map((time) => (
        <button
          key={time}
          onClick={() => handleTimeClick(time)}
          className={`
            p-2 rounded border
            ${selectedTime === time 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
            ${bookedTimes.includes(time) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          disabled={bookedTimes.includes(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlots;