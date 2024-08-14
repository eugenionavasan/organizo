import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const SERVICE_PRICES = {
  cut: 25,
  color: 40,
  shave: 10,
  style: 20
};

const BookingSummary: React.FC<{ 
  date: Date | null; 
  time: string | null; 
  onBooking: (date: Date, time: string) => void 
}> = ({ date, time, onBooking }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('cut');
  const [paymentOption, setPaymentOption] = useState('now');
  const [price, setPrice] = useState(SERVICE_PRICES.cut);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setPrice(SERVICE_PRICES[service as keyof typeof SERVICE_PRICES]);
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time) {
      onBooking(date, time);
      console.log({ name, phone, email, service, paymentOption, date, time, price });
      setBookingSuccess(true);
      // Reset form fields
      setName('');
      setPhone('');
      setEmail('');
      setService('cut');
      setPaymentOption('now');
    } else {
      console.error('Date or time not selected');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your appointment</h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-2">
          {date ? format(date, 'd MMMM yyyy') : 'No date selected'}
          {time && ` at ${time}`}
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          >
            <option value="cut">Cut Hair - $25</option>
            <option value="color">Color Hair - $40</option>
            <option value="shave">Shave beard - $10</option>
            <option value="style">Hair styling - $20</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Payment Option</label>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          >
            <option value="now">Pay Now</option>
            <option value="later">Pay on Service Day</option>
          </select>
        </div>
        
        <p className="text-xl font-bold mb-4">${price.toFixed(2)}</p>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Book Appointment
        </button>
      </form>
      
      {bookingSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          Your appointment has been booked successfully!
        </div>
      )}
    </div>
  );
};

export default BookingSummary;