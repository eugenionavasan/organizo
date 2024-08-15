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
      <div className='p-5 bg-gray-100 font-sans'>
        <h1 className='text-2xl font-bold mb-4'>Booking Calendar</h1>
        <CalendarHeader />
        <div className='grid grid-cols-7 gap-4'>
          {days.map((day) => {
            const dayString = format(day, 'yyyy-MM-dd');
            const dayBookings = (formattedBookings[dayString] || []).sort(
              (a, b) => a.time.localeCompare(b.time) // Sort by time
            );
            const isTodayClass = isToday(day) ? 'bg-blue-100' : '';

            return (
              <div
                key={dayString}
                className={`bg-white border border-gray-300 p-3 rounded-lg shadow-sm ${isTodayClass}`}
              >
                <strong className='block text-xl font-semibold mb-2'>
                  {format(day, 'd')}
                </strong>
                <div>
                  {dayBookings.length > 0 ? (
                    dayBookings.map((booking, index) => (
                      <div
                        key={index}
                        className='bg-blue-500 text-white p-2 rounded-md text-sm mb-1'
                      >
                        <strong>{booking.time}</strong>
                        <div>{booking.service}</div>
                        <div>{booking.customer}</div>
                      </div>
                    ))
                  ) : (
                    <div className='text-gray-500 text-sm'>No bookings</div>
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
