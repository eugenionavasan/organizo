import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { BookingFormProps, ServiceType } from "../types/types";
import { SERVICE_PRICES } from "../constants/constants";
import { formatDate } from "../utils/formatDate";
import { FormInput } from "./formInput";
import { FormSelect } from "./formSelect";
import { PaymentSection } from "./paymentSection";
import { useBookingForm } from "../hooks/useBookingForm";
import { processPayment, bookAppointment } from "../helpers/BookingFormHelpers";

export const BookingForm: React.FC<BookingFormProps> = ({
  date,
  time,
  onBooking,
  onTimeBooked,
}) => {
  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    service,
    setService,
    paymentOption,
    setPaymentOption,
    price,
    bookingSuccess,
    setBookingSuccess,
    isProcessing,
    setIsProcessing,
    paymentError,
    setPaymentError,
    resetForm,
  } = useBookingForm();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !date || !time) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    let paymentSucceeded = false;

    if (paymentOption === "now") {
      paymentSucceeded = await processPayment(
        stripe,
        elements,
        price,
        setPaymentError
      );
    } else {
      paymentSucceeded = true;
    }

    if (paymentSucceeded) {
      await bookAppointment(
        date,
        time,
        name,
        phone,
        email,
        service,
        paymentOption === "now",
        setBookingSuccess,
        setPaymentError,
        onTimeBooked,
        onBooking,
        resetForm
      );
      // Sending confirmation email after booking is confirmed
      try {
        const response = await fetch("/api/sendConfirmationEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            date,
            time,
            service,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to send confirmation email");
        }
        console.log("Confirmation email sent successfully");
      } catch (error) {
        console.error("Error sending confirmation email:", error);
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your appointment</h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-2">
          {formatDate(date)}
          {time && ` at ${time}`}
        </p>

        <FormInput
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormInput
          label="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormSelect
          label="Service"
          value={service}
          onChange={(e) => setService(e.target.value as ServiceType)}
          options={Object.entries(SERVICE_PRICES).map(([key, value]) => ({
            value: key,
            label: key,
          }))}
          required
        />

        <PaymentSection
          paymentOption={paymentOption}
          setPaymentOption={setPaymentOption}
        />

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
