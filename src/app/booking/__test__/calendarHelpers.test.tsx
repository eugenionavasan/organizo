import { render } from '@testing-library/react';
import { getMonthHeader, getDaysOfWeek, getCalendarCells, renderHeader, renderDays, renderCells } from '../helpers/calendarHelpers';

describe('Calendar Helper Functions', () => {
  const testDate = new Date(2023, 0, 15); // January 15, 2023

  test('getMonthHeader returns correct month and year', () => {
    expect(getMonthHeader(testDate)).toBe('January 2023');
  });

  test('getDaysOfWeek returns correct days', () => {
    const days = getDaysOfWeek(testDate);
    expect(days).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  });

  test('getCalendarCells returns correct number of weeks', () => {
    const cells = getCalendarCells(testDate, testDate);
    expect(cells.length).toBe(5); // January 2023 has 5 weeks
  });

  test('renderHeader renders correct month and buttons', () => {
    const { getByText } = render(
      <div>{renderHeader(testDate, jest.fn(), jest.fn())}</div>
    );
    expect(getByText('January 2023')).toBeInTheDocument();
    expect(getByText('<')).toBeInTheDocument();
    expect(getByText('>')).toBeInTheDocument();
  });

  test('renderDays renders correct day labels', () => {
    const { getByText } = render(<div>{renderDays(testDate)}</div>);
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      expect(getByText(day)).toBeInTheDocument();
    });
  });

  test('renderCells renders correct number of days', () => {
    const { getAllByText } = render(
      <div>{renderCells(testDate, testDate, jest.fn())}</div>
    );
    // Check if all days of January are present
    for (let i = 1; i <= 31; i++) {
      expect(getAllByText(i.toString()).length).toBeGreaterThan(0);
    }
  });
});