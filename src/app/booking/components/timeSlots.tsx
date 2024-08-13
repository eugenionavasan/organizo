import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const TimeSlots: React.FC<{ selectedDate: Date; onSelectTime: (time: string) => void }> = ({ selectedDate, onSelectTime }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 9; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        times.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), hour, minute));
      }
    }
    return times;
  };

  const handleTimeClick = (time: Date) => {
    const formattedTime = format(time, 'hh:mm a');
    setSelectedTime(formattedTime);
    onSelectTime(formattedTime);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select a Date and Time</h2>
        <div className="time-slots grid grid-cols-2 gap-2 h-[calc(100vh-200px)] overflow-y-auto">
        {generateTimeSlots().map((time) => (
          <button
            key={time.toISOString()}
            onClick={() => handleTimeClick(time)}
            className={`
              p-2 rounded border
              ${selectedTime === format(time, 'hh:mm a')
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
            `}
          >
            {format(time, 'hh:mm a')}
          </button>
        ))}
        </div>
    </div>
  );
};

export default TimeSlots;