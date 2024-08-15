'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';

const CalendarHeader: React.FC = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1); // 1-based month
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setMonth(month === 1 ? 12 : month - 1);
      if (month === 1) setYear(year - 1);
    } else {
      setMonth(month === 12 ? 1 : month + 1);
      if (month === 12) setYear(year + 1);
    }
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
