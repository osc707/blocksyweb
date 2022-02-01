import differenceInDays from 'date-fns/differenceInDays'

export const isDataStale = (startDate: string): boolean => {
  const today = new Date();
  const dataLastUpdated = new Date(startDate);
  return differenceInDays(today, dataLastUpdated) >= 2;
};

export const setView = (fn: Function): void => {
  (window.matchMedia('(min-width: 1000px)').matches) ? fn(true) : fn(false);
};