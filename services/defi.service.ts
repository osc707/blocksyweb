import differenceInDays from 'date-fns/differenceInDays'
import parse from 'date-fns/parse'

export const dateFormat = 'yyyy-MM-dd';

export const isDataStale = (startDate: string): boolean => {
  const today = new Date();
  const dataLastUpdated = parse(startDate, dateFormat, new Date());
  return differenceInDays(today, dataLastUpdated) >= 2;
};

export const setView = (fn: Function): void => {
  (window.matchMedia('(min-width: 1000px)').matches) ? fn(true) : fn(false);
};