import Appointment from './Appointment';
import { AppointmentProps } from '@/app/lib/types';
const appointments: AppointmentProps[] = [
  {
    clientName: "John Doe",
    appointmentDate: "2024-08-14T09:00:00Z",
    appointmentTimeWindow: "9:00 AM - 10:00 AM",
    paymentStatus: "Paid",
  },
  {
    clientName: "Jane Smith",
    appointmentDate: "2024-08-14T14:00:00Z",
    appointmentTimeWindow: "2:00 PM - 3:00 PM",
    paymentStatus: "Pending",
  },
  {
    clientName: "Alice Johnson",
    appointmentDate: "2024-08-15T11:00:00Z",
    appointmentTimeWindow: "11:00 AM - 12:00 PM",
    paymentStatus: "Paid",
  },
  {
    clientName: "Bob Brown",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Yesterday
    appointmentTimeWindow: "3:00 PM - 4:00 PM",
    paymentStatus: "Paid",
  },
  {
    clientName: "Charlie Davis",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), // Next week
    appointmentTimeWindow: "1:00 PM - 2:00 PM",
    paymentStatus: "Pending",
  },
  {
    clientName: "Eve Wilson",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(), // Next month
    appointmentTimeWindow: "10:00 AM - 11:00 AM",
    paymentStatus: "Paid",
  },
  {
    clientName: "Frank Green",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString(), // Two weeks from now
    appointmentTimeWindow: "4:00 PM - 5:00 PM",
    paymentStatus: "Pending",
  },
  {
    clientName: "Grace Lee",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Tomorrow
    appointmentTimeWindow: "12:00 PM - 1:00 PM",
    paymentStatus: "Paid",
  },
  {
    clientName: "Henry Martin",
    appointmentDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), // Three days from now
    appointmentTimeWindow: "8:00 AM - 9:00 AM",
    paymentStatus: "Pending",
  },
];

export default function UpcomingAppointments() {
  // Sort appointments by the soonest date
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
  );

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-3 overflow-y-auto h-full">
        <div className="sticky top-0 bg-white p-4 border-b z-10">
            <h3 className="text-xl font-bold mb-4 text-gray-500 hover:scale-105">Upcoming Appointments</h3>
            </div>

      {sortedAppointments.map((appointment, index) => (
        <Appointment
          key={index}
          clientName= {appointment.clientName}
          appointmentDate={appointment.appointmentDate}
          appointmentTimeWindow={appointment.appointmentTimeWindow}
          paymentStatus={appointment.paymentStatus}
        />
      ))}
    </div>
  );
}
