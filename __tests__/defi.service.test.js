import { format, sub } from 'date-fns'

import { dateFormat, isDataStale } from '../services/defi.service'

test('isDataStale should be false because it\'s today', () => {
  const date = format(new Date(), dateFormat)
  expect(
    isDataStale(date)
  ).toBe(false);
});

test('isDataStale should be false because it\'s yesterday', () => {
  const date = format(sub(new Date(), { days: 1 }), dateFormat);
  expect(
    isDataStale(date)
  ).toBe(false);
});

test('isDataStale should be true', () => {
  const date = format(sub(new Date(), { days: 2 }), dateFormat);
  expect(
    isDataStale(date)
  ).toBe(true);
});