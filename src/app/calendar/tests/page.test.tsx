import { render, screen, waitFor } from '@testing-library/react';
import CalendarPage from '../page'; // Adjust the import path if needed
import { FormattedBookings } from '../components/types';
import { fetchBookings, formatBookings } from '../components/utils';

// Mock utils
jest.mock('../components/utils', () => ({
  fetchBookings: jest.fn(),
  formatBookings: jest.fn(),
}));

// Mock the useSearchParams hook from 'next/navigation'
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('year=2024&month=5'),
}));

describe('CalendarPage', () => {
  const mockFetchBookings = fetchBookings as jest.MockedFunction<
    typeof fetchBookings
  >;
  const mockFormatBookings = formatBookings as jest.MockedFunction<
    typeof formatBookings
  >;

  it('renders calendar with bookings', async () => {
    // Mock data
    const year = 2024;
    const month = 5;
    const bookings = [
      {
        id: '1',
        bookedTime: new Date(
          `${year}-${month.toString().padStart(2, '0')}-01T10:00:00`
        ),
        service: { name: 'Service A' },
        customer: { name: 'Customer A' },
        serviceId: 'service-id',
        customerId: 'customer-id',
        hasPaid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const formattedBookings: FormattedBookings = {
      '2024-05-01': [
        { time: '10:00', service: 'Service A', customer: 'Customer A' },
      ],
    };

    mockFetchBookings.mockResolvedValue(bookings);
    mockFormatBookings.mockReturnValue(formattedBookings);

    // Render the component with mock searchParams
    render(<CalendarPage searchParams={{ year: '2024', month: '5' }} />);

    // Wait for async data fetching and rendering
    await waitFor(() => {
      expect(screen.getByText('Booking Calendar')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('Service A')).toBeInTheDocument();
      expect(screen.getByText('Customer A')).toBeInTheDocument();
    });
  });

  it('handles no bookings scenario', async () => {
    // Mock data for no bookings
    const formattedBookings: FormattedBookings = {};

    mockFetchBookings.mockResolvedValue([]);
    mockFormatBookings.mockReturnValue(formattedBookings);

    // Render the component with mock searchParams
    render(<CalendarPage searchParams={{ year: '2024', month: '5' }} />);

    // Wait for async data fetching and rendering
    await waitFor(() => {
      expect(screen.getByText('Booking Calendar')).toBeInTheDocument();
      expect(screen.getByText('No bookings')).toBeInTheDocument();
    });
  });
});
