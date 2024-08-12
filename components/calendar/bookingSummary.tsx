import React from 'react';

const BookingSummary: React.FC<{ date: Date | null; time: string | null; price: number }> = ({ date, time, price }) => {
  return (
    <div>
      <h2>Booking Summary</h2>
      <p>Date: {date ? date.toDateString() : 'No date selected'}</p>
      <p>Time: {time || 'No time selected'}</p>
      <p>Price: ${price.toFixed(2)}</p>
    </div>
  );
};

export default BookingSummary;