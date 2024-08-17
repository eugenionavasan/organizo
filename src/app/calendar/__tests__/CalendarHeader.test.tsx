import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarHeader from '../CalendarHeader';
import { handleMonthChange } from '../components/utils';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the date-fns module
jest.mock('date-fns', () => ({
  format: jest.fn(() => 'Mocked Date'),
}));

// Mock the handleMonthChange function
jest.mock('../components/utils', () => ({
  handleMonthChange: jest.fn(),
}));

describe('CalendarHeader', () => {
  const mockProps = {
    year: 2024,
    month: 8,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<CalendarHeader {...mockProps} />);

    expect(screen.getByText('‹')).toBeInTheDocument();
    expect(screen.getByText('Mocked Date')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
  });

  it('calls handleMonthChange with "prev" when previous button is clicked', () => {
    render(<CalendarHeader {...mockProps} />);

    const prevButton = screen.getByText('‹');
    fireEvent.click(prevButton);

    expect(handleMonthChange).toHaveBeenCalledWith(
      'prev',
      mockProps.year,
      mockProps.month,
      expect.any(Object)
    );
  });

  it('calls handleMonthChange with "next" when next button is clicked', () => {
    render(<CalendarHeader {...mockProps} />);

    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton);

    expect(handleMonthChange).toHaveBeenCalledWith(
      'next',
      mockProps.year,
      mockProps.month,
      expect.any(Object)
    );
  });
});
