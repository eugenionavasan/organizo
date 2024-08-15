import { PrismaClient } from '@prisma/client';
import Layout from '../../components/layout';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from 'date-fns';
import CalendarHeader from './CalendarHeader'; // Import the Client Component

// Initialize Prisma Client
const prisma = new PrismaClient();

// Fetch booking data
const fetchBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      service: {
        select: {
          name: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
    },
  });
};

// Calendar page component
export default async function CalendarPage() {
  const bookings = await fetchBookings();

  // Format bookings into a calendar-friendly format
  const formattedBookings = bookings.reduce(
    (
      acc: {
        [key: string]: { time: string; service: string; customer: string }[];
      },
      booking
    ) => {
      const date = format(new Date(booking.bookedTime), 'yyyy-MM-dd');
      const time = format(new Date(booking.bookedTime), 'HH:mm');

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({
        time,
        service: booking.service.name,
        customer: booking.customer.name,
      });
      return acc;
    },
    {}
  );

  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const days = eachDayOfInterval({ start, end });

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>Booking Calendar</h1>
        <CalendarHeader />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {days.map((day) => {
            const dayString = format(day, 'yyyy-MM-dd');
            const dayBookings = formattedBookings[dayString] || [];
            const isTodayClass = isToday(day) ? 'today' : '';

            return (
              <div
                key={dayString}
                style={{
                  border: '1px solid #ddd',
                  padding: '10px',
                  marginBottom: '10px',
                  backgroundColor: isTodayClass ? '#e0f7fa' : 'white',
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    fontSize: '18px',
                    marginBottom: '5px',
                  }}
                >
                  {format(day, 'dd MMMM yyyy')}
                </strong>
                <div>
                  {dayBookings.length > 0 ? (
                    dayBookings.map((booking, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: '5px',
                          padding: '5px',
                          border: '1px solid #ddd',
                          borderRadius: '3px',
                        }}
                      >
                        <strong>{booking.time}</strong>
                        <div>{booking.service}</div>
                        <div>{booking.customer}</div>
                      </div>
                    ))
                  ) : (
                    <div>No bookings</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
