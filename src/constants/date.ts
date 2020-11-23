import * as zNumber from './number';
import * as zString from './string';

enum DAY {
  SUNDAY = 'Sunday',
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday'
}

export enum MONTH {
  JANUARY = 'January',
  FEBRUARY = 'February',
  MARCH = 'March',
  APRIL = 'April',
  MAY = 'May',
  JUNE = 'June',
  JULY = 'July',
  AUGUST = 'August',
  SEPTEMBER = 'September',
  OCTOBER = 'October',
  NOVEMBER = 'November',
  DECEMBER = 'December'
}

export const Months: MonthMapType = {
  [MONTH.JANUARY]: { days: 31, index: 1 },
  [MONTH.FEBRUARY]: { days: 29, index: 2 },
  [MONTH.MARCH]: { days: 31, index: 3 },
  [MONTH.APRIL]: { days: 30, index: 4 },
  [MONTH.MAY]: { days: 31, index: 5 },
  [MONTH.JUNE]: { days: 30, index: 6 },
  [MONTH.JULY]: { days: 31, index: 7 },
  [MONTH.AUGUST]: { days: 31, index: 8 },
  [MONTH.SEPTEMBER]: { days: 30, index: 9 },
  [MONTH.OCTOBER]: { days: 31, index: 10 },
  [MONTH.NOVEMBER]: { days: 30, index: 11 },
  [MONTH.DECEMBER]: { days: 31, index: 12 }
};

export const formatDate = (
  value: string | number | Date,
  options: FormatDateOptions = {}
): string => {
  if (!value) return '';

  if (typeof value === 'string') {
    if (new RegExp(/^[0-9]+$/).test(value) && !isNaN(parseInt(value))) {
      value = parseInt(value);
    }
  }

  const { withYear = true, withWeekday = false } = options;

  const date = new Date(value);
  const weekday = getDayOfWeek(date.getDay());
  const day = date.getDate();
  const month = getMonthByNumber(date.getMonth() + 1);
  const year = date.getFullYear();

  const base = `${getDateAndSuffix(day)} ${month}`;
  const result = `${withWeekday ? weekday + ' ' : ''}${base}${
    withYear ? ' ' + year : ''
  }`;
  return result;
};

export const formatTime = (value: string | Date): string => {
  if (!value) return '';

  const isDateTime = value instanceof Date || value.includes('T');

  let hour, min;

  if (isDateTime) {
    const dt = new Date(value);
    hour = dt.getHours();
    min = dt.getMinutes();
  } else {
    if (!isDateString(value)) return '';
    hour = parseInt(value.substring(0, 2));
    min = parseInt(value.substring(3, 5));
  }

  const period = getTimePeriod(hour);

  hour = convertTo12HourNumber(hour);
  min = zNumber.toDoubleDigit(min);

  let result = `${hour}:${min}${period}`;
  return result;
};

export const formatDateTime = (value: string): string => {
  if (!value) return '';
  return `${formatISOTime(value, false)}, ${formatDate(value)}`;
};

export const formatISODate = (date: string | Date): string => {
  if (!date) return '';

  const value = new Date(date);
  let dd = zNumber.toDoubleDigit(value.getDate());
  let mm = zNumber.toDoubleDigit(value.getMonth() + 1);
  let yyyy = value.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

export const formatISOTime = (
  time: string | Date,
  withSeconds: boolean = true
): string => {
  if (!time) return '';

  const isDateTime = time instanceof Date || time.includes('T');
  let hour, min, sec;

  if (isDateTime) {
    const dt = new Date(time);
    hour = dt.getHours();
    min = dt.getMinutes();
    sec = dt.getSeconds();
  } else {
    if (!isDateString(time)) return '';
    hour = parseInt(time.substring(0, 2));
    min = parseInt(time.substring(3, 5));
    sec = parseInt(time.substring(6, 8));
  }

  hour = zNumber.toDoubleDigit(hour);
  min = zNumber.toDoubleDigit(min);
  sec = zNumber.toDoubleDigit(sec);

  let result = `${hour}:${min}`;
  if (withSeconds) result += `:${sec}`;

  return result;
};

export const calculateAge = (date: string | Date): number => {
  const birthday = new Date(date);

  const dd = birthday.getDate();
  const mm = birthday.getMonth();
  const yy = birthday.getFullYear();

  const td = new Date().getDate();
  const tm = new Date().getMonth();
  const ty = new Date().getFullYear();

  let age = ty - yy;
  age += (tm - mm) / 12;
  age += (td - dd) / 310;

  return Math.floor(age);
};

/**
 * Retrieves the date together with its ordinal.
 */
export const getDateAndSuffix = (day: number): string => {
  return `${day}${getDateSuffix(day)}`;
};

/**
 * Retrieve the day numbers of a specified month.
 */
export const getDatesForMonth = (month?: string) => {
  if (!month) month = MONTH.JANUARY;
  const daysInMonth = Months[month as MONTH].days;

  const array = [];
  for (let i = 1; i <= daysInMonth; i++) {
    array.push(getDateAndSuffix(i));
  }
  return array;
};

/**
 * Retrieves a month string by its number.
 */
export const getMonthByNumber = (number: number) => {
  if (number < 1 || number > 12) {
    throw new RangeError('Number specified not within bounds');
  }

  return zString.toTitleCase(Object.keys(Months)[number - 1]);
};

/**
 * Retrieves all of the months of the year.
 */
export const getAllMonths = (): string[] => {
  const array = [];
  for (let [key] of Object.entries(Months)) {
    array.push(zString.toTitleCase(key));
  }
  return array;
};

/**
 * Retrieves an array of years specified by the argument bounds.
 */
export const getYearsInRange = (
  startYear?: number,
  endYear?: number
): number[] => {
  const year = new Date().getFullYear();
  if (!startYear) startYear = year - 40;
  if (!endYear) endYear = year + 3;

  const array = [];
  for (let i = startYear; i <= endYear; i++) array.push(i);
  return array;
};

/**
 * Returns a list of hours for <select> elements.
 */
export const getAllHours = (): TimeUnitEntry[] => {
  const hours = [];
  for (let i = 0; i <= 23; i++) {
    hours.push({
      label: zNumber.toDoubleDigit(i),
      value: i.toString()
    });
  }
  return hours;
};

/**
 * Returns a list of minutes for <select> elements.
 */
export const getAllMinutes = (increment: number = 1): TimeUnitEntry[] => {
  const minutes = [];
  for (let i = 0; i <= 59; i += increment) {
    minutes.push({
      label: zNumber.toDoubleDigit(i),
      value: i.toString()
    });
  }
  return minutes;
};

/**
 * Gets the adverb describing the date relative to today.
 */
export const getAdverbRelativeToToday = (
  value: string | Date,
  options: AdverbRetrievalOptions = {}
): string => {
  if (!value) return '';
  const { preposition = 'on' } = options;

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  const date = new Date(value);

  if (isSameDay(date, today)) return 'today';
  if (isSameDay(date, tomorrow)) return 'tomorrow';
  if (isSameDay(date, yesterday)) return 'yesterday';

  // If in the past...
  if (date.getTime() <= today.getTime()) {
    for (let i = 2; i < 7; i++) {
      const past = new Date(new Date().setDate(new Date().getDate() - i));
      if (isSameDay(date, past)) {
        return `${i} days ago`;
      }
    }
  } else {
    for (let i = 2; i < 7; i++) {
      const future = new Date(new Date().setDate(new Date().getDate() + i));
      if (isSameDay(date, future)) {
        return `${preposition} ${getDayOfWeek(future.getDay())}`;
      }
    }
  }

  return formatDate(date, {
    withWeekday: true,
    withYear: date.getFullYear() !== today.getFullYear()
  });
};

/**
 * Retrieves the day of the week using its number.
 */
const getDayOfWeek = (number: number): string => {
  return zString.toTitleCase(Object.keys(DAY)[number]);
};

/**
 * Checks whether two dates are the same.
 */
const isSameDay = (date: Date, comparator: Date) => {
  return (
    date.getFullYear() === comparator.getFullYear() &&
    date.getMonth() === comparator.getMonth() &&
    date.getDate() === comparator.getDate()
  );
};

/**
 * Retrieves the ordinal of the date.
 */
const getDateSuffix = (day: number): string => {
  let suffix = '';

  switch (day) {
    case 1:
    case 21:
    case 31:
      suffix = 'st';
      break;
    case 2:
    case 22:
      suffix = 'nd';
      break;
    case 3:
    case 23:
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
  }

  return suffix;
};

/**
 * Retrieves the period of the hour.
 */
const getTimePeriod = (hour: number): string => {
  return hour < 12 ? 'am' : 'pm';
};

/**
 * Convert hour to 12-hour convention.
 */
const convertTo12HourNumber = (hour: number): number => {
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour = hour - 12;
  }

  return hour;
};

/**
 * Checks if the date is a string.
 */
const isDateString = (value: unknown): value is string => {
  return typeof value === 'string';
};

type MonthMapType = {
  [key in MONTH]: MonthValue;
};

interface MonthValue {
  days: number;
  index: number;
}

interface FormatDateOptions {
  withYear?: boolean;
  withWeekday?: boolean;
}

interface TimeUnitEntry {
  label: string;
  value: string;
}

interface AdverbRetrievalOptions {
  preposition?: string;
}
