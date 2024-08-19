'use client'

import { useState } from 'react';
import { addDays } from 'date-fns';
import { renderHeader, renderDays, renderCells } from '../helpers/calendarHelpers';

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    onSelectDate(day);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(addDays(currentMonth, -30));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 30));
  };

  return (
    <div className="calendar bg-white p-6 rounded-lg shadow-md w-full aspect-square">
      {renderHeader(currentMonth, handlePrevMonth, handleNextMonth)}
      {renderDays(currentMonth)}
      {renderCells(currentMonth, selectedDate, handleDateClick)}
    </div>
  );
};

export default Calendar;