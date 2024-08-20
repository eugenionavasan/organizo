import { render, fireEvent } from '@testing-library/react';
import Calendar from '../components/calendar';

describe('Calendar Component', () => {
  const mockOnSelectDate = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 0, 15)); // January 15, 2023
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders calendar with correct month and year', () => {
    const { getByText } = render(<Calendar onSelectDate={mockOnSelectDate} />);
    expect(getByText('January 2023')).toBeInTheDocument();
  });

  test('renders correct number of days', () => {
    const { getAllByText } = render(<Calendar onSelectDate={mockOnSelectDate} />);
    // Check if all days of January are present
    for (let i = 1; i <= 31; i++) {
      expect(getAllByText(i.toString()).length).toBeGreaterThan(0);
    }
  });

  test('calls onSelectDate when a day is clicked', () => {
    const { getByText } = render(<Calendar onSelectDate={mockOnSelectDate} />);
    fireEvent.click(getByText('15'));
    expect(mockOnSelectDate).toHaveBeenCalledWith(expect.any(Date));
  });

  test('changes month when navigation buttons are clicked', () => {
    const { getByText } = render(<Calendar onSelectDate={mockOnSelectDate} />);
    
    // Go to next month
    fireEvent.click(getByText('>'));
    expect(getByText('February 2023')).toBeInTheDocument();

    // Go back to previous month
    fireEvent.click(getByText('<'));
    expect(getByText('January 2023')).toBeInTheDocument();
  });
});