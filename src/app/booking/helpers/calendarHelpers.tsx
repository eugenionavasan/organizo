import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isPast, isToday } from 'date-fns';

export const getMonthHeader = (currentMonth: Date): string => {
  return format(currentMonth, "MMMM yyyy");
};

export const getDaysOfWeek = (currentMonth: Date): string[] => {
  const dateFormat = "EEE";
  const days = [];
  const startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(format(addDays(startDate, i), dateFormat));
  }

  return days;
};

export interface CalendarCell {
  date: Date;
  formattedDate: string;
  isCurrentMonth: boolean;
  isDisabled: boolean;
  isSelected: boolean;
}

export const getCalendarCells = (currentMonth: Date, selectedDate: Date): CalendarCell[][] => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows: CalendarCell[][] = [];
  let days: CalendarCell[] = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, dateFormat);
      const isDisabled = isPast(day) && !isToday(day);
      days.push({
        date: day,
        formattedDate,
        isCurrentMonth: isSameMonth(day, monthStart),
        isDisabled,
        isSelected: isSameDay(day, selectedDate) && !isDisabled
      });
      day = addDays(day, 1);
    }
    rows.push(days);
    days = [];
  }

  return rows;
};

export const renderHeader = (
  currentMonth: Date,
  onPrevMonth: () => void,
  onNextMonth: () => void
): React.ReactNode => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button 
        className="text-gray-600 hover:text-gray-800"
        onClick={onPrevMonth}
      >
        &lt;
      </button>
      <span className="text-2xl font-bold">
        {getMonthHeader(currentMonth)}
      </span>
      <button 
        className="text-gray-600 hover:text-gray-800"
        onClick={onNextMonth}
      >
        &gt;
      </button>
    </div>
  );
};

export const renderDays = (currentMonth: Date): React.ReactNode => {
  const days = getDaysOfWeek(currentMonth);
  return (
    <div className="grid grid-cols-7 gap-1 mb-2">
      {days.map((day, index) => (
        <div className="text-center text-gray-600 font-medium text-xl" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

export const renderCells = (
  currentMonth: Date,
  selectedDate: Date,
  onDateClick: (date: Date) => void
): React.ReactNode => {
  const rows = getCalendarCells(currentMonth, selectedDate);
  return (
    <div className="mb-4">
      {rows.map((week, weekIndex) => (
        <div className="grid grid-cols-7 gap-1" key={weekIndex}>
          {week.map((day, dayIndex) => (
            <div
              className={`
                aspect-square flex items-center justify-center cursor-pointer text-2xl
                ${!day.isCurrentMonth ? "text-gray-400" : ""}
                ${day.isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
                ${day.isSelected
                  ? "bg-blue-500 text-white rounded-full" 
                  : day.isDisabled ? "" : "hover:bg-gray-100 rounded-full"}
              `}
              key={dayIndex}
              onClick={() => !day.isDisabled && onDateClick(day.date)}
            >
              {day.formattedDate}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};