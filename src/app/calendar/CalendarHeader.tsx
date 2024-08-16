'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

const CalendarHeader: React.FC<{ year: number; month: number }> = ({
  year,
  month,
}) => {
  const router = useRouter();

  const handleMonthChange = (direction: 'prev' | 'next') => {
    let newMonth = month;
    let newYear = year;

    if (direction === 'prev') {
      newMonth = month === 1 ? 12 : month - 1;
      if (month === 1) newYear -= 1;
    } else {
      newMonth = month === 12 ? 1 : month + 1;
      if (month === 12) newYear += 1;
    }

    router.push(`/calendar?year=${newYear}&month=${newMonth}`);
  };

  return (
    <div style={styles.header}>
      <button onClick={() => handleMonthChange('prev')}>‹</button>
      <span>{`${format(new Date(year, month - 1), 'MMMM yyyy')}`}</span>
      <button onClick={() => handleMonthChange('next')}>›</button>
    </div>
  );
};

export default CalendarHeader;

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
