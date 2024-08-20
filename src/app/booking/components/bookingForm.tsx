"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const SERVICE_PRICES = {
  cut: 25,
  color: 40,
  shave: 10,
  style: 20,
} as const;

type ServiceType = keyof typeof SERVICE_PRICES;

interface BookingFormProps {
  date: Date | null;
  time: string | null;
  onBooking: (date: Date, time: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ date, time, onBooking }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<ServiceType>("cut");
  const [paymentOption, setPaymentOption] = useState<"now" | "later">("now");
  const [price, setPrice] = useState<number>(SERVICE_PRICES.cut);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setPrice(SERVICE_PRICES[service]);
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !date || !time) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    if (paymentOption === "now") {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setPaymentError("Card element not found");
        setIsProcessing(false);
        return;
      }

      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: price * 100 }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await response.json();

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

        if (result.error) {
          setPaymentError(result.error.message || "Payment failed");
        } else if (result.paymentIntent.status === "succeeded") {
          onBooking(date, time);
          setBookingSuccess(true);
          resetForm();
        }
      } catch (error) {
        setPaymentError("An error occurred during payment processing");
      }
    } else {
      onBooking(date, time);
      setBookingSuccess(true);
      resetForm();
    }

    setIsProcessing(false);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setService("cut");
    setPaymentOption("now");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 w-full lg:w-3/4">
      <h2 className="text-xl font-semibold mb-4">Your appointment</h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-2">
          {date ? format(date, "d MMMM yyyy") : "No date selected"}
          {time && ` at ${time}`}
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value as ServiceType)}
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
          <label className="block text-sm font-medium text-gray-700">
            Payment Option
          </label>
          <select
            value={paymentOption}
            onChange={(e) =>
              setPaymentOption(e.target.value as "now" | "later")
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          >
            <option value="now">Pay Now</option>
            <option value="later">Pay on Service Day</option>
          </select>
        </div>

        {paymentOption === "now" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Card Details
            </label>
            <CardElement className="mt-1 p-2 border rounded" />
          </div>
        )}

        <p className="text-xl font-bold mb-4">${price.toFixed(2)}</p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Book Appointment"}
        </button>
      </form>

      {paymentError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {paymentError}
        </div>
      )}

      {bookingSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          Your appointment has been booked successfully!
        </div>
      )}
    </div>
  );
};

export default BookingForm;
