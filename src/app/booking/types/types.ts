export type ServiceType = 'haircut' | 'haircoloring' | 'hairwashing' | 'beardtrim' | 'scalpmassage';

export interface BookingFormProps {
  date: Date | null;
  time: string | null;
  onBooking: (date: Date, time: string) => void;
  bookedTimes: string[];
  onTimeBooked: (time: string) => void;
}