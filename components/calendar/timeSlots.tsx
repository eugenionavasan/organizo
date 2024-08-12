import React, { useState } from 'react';

const TimeSlots: React.FC<{ onSelectTime: (time: string) => void }> = ({ onSelectTime }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const generateTimeSlots = () => {
    const times = [];
    const startHour = 9; // 9:00 PM
    const endHour = 20; // 12:00 AM
    for (let hour = startHour; hour < endHour; hour++) {
      times.push(`${hour}:00 PM`);
      times.push(`${hour}:30 PM`);
    }
    return times;
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onSelectTime(time);
  };

  return (
    <div className="time-slots">
      {generateTimeSlots().map((time) => (
        <button
          key={time}
          onClick={() => handleTimeClick(time)}
          className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlots;