export type FormattedBookings = {
  [key: string]: { time: string; service: string; customer: string }[];
};

export interface CalendarPageProps {
  searchParams: { year: string; month: string };
}
