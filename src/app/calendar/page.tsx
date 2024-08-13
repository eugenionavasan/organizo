'use client';

import React, { useState } from 'react';

type Event = {
  time: string;
  title: string;
};

const mockEvents: { [key: number]: Event[] } = {
  1: [
    { time: '9:30 AM', title: 'Booking 1' },
    { time: '1:00 PM', title: 'Booking 2' },
  ],
  4: [{ time: '8:00 AM', title: 'Booking 3' }],
  5: [{ time: '2:00 PM', title: 'Booking 4' }],
  10: [{ time: '10:30 AM', title: 'Booking 5' }],
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

const Calendar: React.FC = () => {
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

  const daysInMonth = getDaysInMonth(month, year);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => handleMonthChange('prev')}>‹</button>
        <span>{`${new Date(year, month - 1).toLocaleString('default', {
          month: 'long',
        })} ${year}`}</span>
        <button onClick={() => handleMonthChange('next')}>›</button>
      </div>
      <div style={styles.list}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div key={day} style={styles.dayRow}>
            <div style={styles.dayNumber}>{day}</div>
            <div style={styles.eventList}>
              {mockEvents[day as keyof typeof mockEvents]?.map(
                (event, index) => (
                  <div key={index} style={styles.event}>
                    {event.title} - {event.time}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  dayRow: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
    padding: '10px 15px',
  },
  dayNumber: {
    fontWeight: 'bold',
    marginRight: '15px',
  },
  eventList: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '5px',
  },
  event: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '3px',
    fontSize: '14px',
  },
};
