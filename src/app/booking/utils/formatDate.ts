import { format } from 'date-fns';

export const formatDate = (date: Date | null): string => {
  return date ? format(date, 'yyyy-MM-dd') : '';
};

export const formatTime = (time: string | null): string => {
  return time ? format(new Date(`2000-01-01T${time}`), 'HH:mm:ss') : '';
};