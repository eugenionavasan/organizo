"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isPast,
  isToday,
} from "date-fns";

const Calendar: React.FC<{ onSelectDate: (date: Date) => void }> = ({
  onSelectDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
        >
          &lt;
        </button>
        <span className="text-2xl font-bold">
          {format(currentMonth, dateFormat)}
        </span>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
        >
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center text-gray-600 font-medium text-xl" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-1 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isDisabled = isPast(day) && !isToday(day);
        days.push(
          <div
            className={`
              aspect-square flex items-center justify-center cursor-pointer text-2xl
              ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""}
              ${isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
              ${
                isSameDay(day, selectedDate) && !isDisabled
                  ? "bg-blue-500 text-white rounded-full"
                  : isDisabled
                  ? ""
                  : "hover:bg-gray-100 rounded-full"
              }
            `}
            key={day.toString()}
            onClick={() => !isDisabled && onDateClick(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="mb-4">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    onSelectDate(day);
  };

  return (
    <div className="calendar bg-white p-6 rounded-lg shadow-md w-full aspect-square lg:w-3/4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
