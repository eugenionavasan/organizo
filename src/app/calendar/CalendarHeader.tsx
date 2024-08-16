'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { handleMonthChange } from './utils';

const CalendarHeader: React.FC<{ year: number; month: number }> = ({
  year,
  month,
}) => {
  const router = useRouter();

  return (
    <div className='flex justify-between items-center w-full mb-5 text-lg font-bold'>
      <button
        onClick={() => handleMonthChange('prev', year, month, router)}
        className='p-2 rounded-full hover:bg-gray-200'
      >
        ‹
      </button>
      <span>{format(new Date(year, month - 1), 'MMMM yyyy')}</span>
      <button
        onClick={() => handleMonthChange('next', year, month, router)}
        className='p-2 rounded-full hover:bg-gray-200'
      >
        ›
      </button>
    </div>
  );
};

export default CalendarHeader;
