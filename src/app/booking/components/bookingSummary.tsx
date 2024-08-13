import React from 'react';
import { format } from 'date-fns';

const BookingSummary: React.FC<{ date: Date | null; time: string | null; price: number }> = ({ date, time, price }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your appointment</h2>
      <p className="mb-2">Professional haircut</p>
      <p className="mb-2">
        {date ? format(date, 'd MMMM yyyy') : 'No date selected'}
        {time && ` at ${time}`}
      </p>
      <p className="mb-4">30 minutes</p>
      <p className="text-xl font-bold">${price.toFixed(2)}</p>
      <button className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600">Next</button>
    </div>
  );
};

export default BookingSummary;