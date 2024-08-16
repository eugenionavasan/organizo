export type AppointmentProps = {
  clientName: string;
  appointmentDate: string;
  appointmentTimeWindow: string;
  paymentStatus: 'Paid' | 'Pending';
};
