import { AppointmentProps } from '../lib/types';
  
  export default function Appointment({
    clientName,
    appointmentDate,
    appointmentTimeWindow,
    paymentStatus,
  }: AppointmentProps) {
    
  const now = new Date();
  // const tomorrow = new Date();
  // tomorrow.setDate(today.getDate() + 1);
  const appointmentDateObj = new Date(appointmentDate);

  const [startTime, endTime] = appointmentTimeWindow.split(' - ').map(time => {
    const [hour, minute] = time.split(':');
    const ampm = time.includes('PM') ? 'PM' : 'AM';
    let hour24 = parseInt(hour, 10);
    if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
    if (ampm === 'AM' && hour24 === 12) hour24 = 0;
    return new Date(appointmentDateObj.getFullYear(),
    appointmentDateObj.getMonth(),
    appointmentDateObj.getDate(),
    hour24,
    parseInt(minute, 10)
  );
});
  const isToday = appointmentDateObj.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = appointmentDateObj.toDateString() === tomorrow.toDateString();

  if (now > endTime){
     return null;
  }
  
  let dateLabel = appointmentDateObj.toLocaleDateString();

 
  if (isToday) {
    dateLabel = "Today";
  } else if (isTomorrow) {
    dateLabel = "Tomorrow";
  }

    return (
      
      <div className={`flex justify-between items-center p-4 border-b hover:scale-105" ${
        now > startTime ? 'line-through text-black' : ''}`}
    >
        
        <div>
          <h4 className="text-lg font-semibold text-gray-600 flex items-center">
            {clientName}
            {dateLabel === "Today" || dateLabel === "Tomorrow" ? (
            <span className="ml-2 text-gray-500">{dateLabel}</span>
          ) : null}
          </h4>
          <p className="text-sm text-gray-500">
          {dateLabel !== "Today" && dateLabel !== "Tomorrow" && (
            <span>{dateLabel}</span>
          )}
          {" - "}
          {appointmentTimeWindow}
        </p>
        </div>
        <div>
          <span className={`px-2 py-1 text-sm rounded-full ${paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {paymentStatus}
          </span>
        </div>
      </div>
    );
  }