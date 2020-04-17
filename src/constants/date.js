const { toTitleCase } = require('./string');

const DAYS = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday'
}

const MONTHS = {
  JANUARY: { NAME: "January", DAYS: 31, NUMBER: 1 },
  FEBRUARY: { NAME: "February", DAYS: 28, NUMBER: 2 },
  MARCH: { NAME: "March", DAYS: 31, NUMBER: 3 },
  APRIL: { NAME: "April", DAYS: 30, NUMBER: 4 },
  MAY: { NAME: "May", DAYS: 31, NUMBER: 5 },
  JUNE: { NAME: "June", DAYS: 30, NUMBER: 6 },
  JULY: { NAME: "July", DAYS: 31, NUMBER: 7 },
  AUGUST: { NAME: "August", DAYS: 31, NUMBER: 8 },
  SEPTEMBER: { NAME: "September", DAYS: 30, NUMBER: 9 },
  OCTOBER: { NAME: "October", DAYS: 31, NUMBER: 10 },
  NOVEMBER: { NAME: "November", DAYS: 30, NUMBER: 11 },
  DECEMBER: { NAME: "December", DAYS: 31, NUMBER: 12 }
};

/**
 * Convert date to full string e.g. Monday 1st January 2020
 * @param {string} value - The date value to be converted.
 * @param {boolean} [withDay] - Option to include the day of the week.
 * @returns {string} The full date string.
 */
const formatDate = (value, withDay) => {
  if (!value) return '-';

  let dt = new Date(value);

  const date = dt.getDate();
  const day = toTitleCase(Object.keys(DAYS)[dt.getDay() - 1])
  const month = getMonthByNumber(dt.getMonth() + 1);
  const year = dt.getFullYear();

  let result = `${date}${getDateSuffix(date)} ${month} ${year}`;
  result = withDay ? `${day} ${result}` : result;
  
  return result;
}

/**
 * Convert datetime or time string to 12-hour time string e.g. 11:59pm
 * @param {string} value - The time value to be converted.
 * @returns {string} The time in its new format.
 */
const formatTime = (value) => {
  if (!value) return null;

  const isDateTime = typeof value === 'object' || value.includes('T');

  let hour, min;

  if (isDateTime){
    const dt = new Date(value);
    hour = dt.getHours();
    min = dt.getMinutes();
  } else {
    hour = parseInt(value.substring(0, 2));
    min = parseInt(value.substring(3, 5));
  }

  let period = getTimePeriod(hour);

  hour = convertTo12HourNumber(hour);
  min = makeDoubleDigit(min);

  let result = `${hour}:${min}${period}`;
  return result;
}

/**
 * Convert datetime to full date and time string.
 * @param {string} value - The datetime value to be converted.
 * @returns {string} A full datetime stirng.
 */
const formatDateTime = (value) => {
  if (!value) return '-';
  return `${formatISOTime(value, false)} @ ${formatDate(value)}`;
}

/**
 * Convert date to ISO format.
 * @param {string} date - The date value to be converted.
 * @returns {string} An ISO version of the date.
 */
const formatISODate = (date) => {
  const value = new Date(date);
  let dd = makeDoubleDigit(value.getDate());
  let mm = makeDoubleDigit(value.getMonth() + 1);
  let yyyy = value.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Convert datetime or time to ISO format.
 * @param {string} time - The time value to be converted.
 * @param {boolean} [withSeconds] - Option to include the seconds. Defaults to true.
 * @returns {string} An ISO version of the time.
 */
const formatISOTime = (time, withSeconds = true) => {
  if (!time) return null;

  const isDateTime = typeof time === 'object' || time.includes('T');

  if (isDateTime){
    const dt = new Date(time);
    hour = dt.getHours();
    min = dt.getMinutes();
    sec = dt.getSeconds();
  } else {
    hour = parseInt(time.substring(0, 2));
    min = parseInt(time.substring(3, 5));
    sec = parseInt(time.substring(6, 8));
  }

  hour = makeDoubleDigit(hour);
  min = makeDoubleDigit(min);
  sec = makeDoubleDigit(sec);

  let result = `${hour}:${min}`;
  if (withSeconds) result += `:${sec}`;

  return result;
}

/**
 * Calculates age from a provided date.
 * @param {string} date - The date of birth which the age will be calculated from.
 * @returns {number} The calculated age.
 */
const calculateAge = (date) => {
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
}

/**
 * Retrieves the ordinal of the date.
 * @param {number} day - A day number of the month.
 * @returns {string} The corresponding ordinal.
 */
const getDateSuffix = (day) => {
  let suffix = "";
  
  switch(day) {
    case 1: case 21: case 31: suffix = 'st'; break;
    case 2: case 22: suffix = 'nd'; break;
    case 3: case 23: suffix = 'rd'; break;
    default: suffix = 'th';
  }
  
  return suffix;
}

/**
 * Retrieve the day numbers of a specified month.
 * @param {string} [month] - The month of the year
 * @returns {string[]} An array of the day strings.
 */
const getDatesForMonth = (month = MONTHS.JANUARY.NAME) => {
  const daysInMonth = MONTHS[month.toUpperCase()].DAYS;

  const array = [];
  for (let i = 1; i <= daysInMonth; i++){
    array.push(`${i}${getDateSuffix(i)}`);
  }
  return array;
}

/**
 * Retrieves a month string by its number.
 * @param {number} number - A month number between 1 and 12.
 * @returns {string} An array of the month strings.
 */
const getMonthByNumber = (number) => {
  if (number < 1 || number > 12) throw new RangeError('Number specified not within bounds');
  return toTitleCase(Object.keys(MONTHS)[number - 1]);
}

/**
 * Retrieves all of the months of the year.
 * @returns {string[]} An array of the month strings.
 */
const getAllMonths = () => {
  const array = [];
  for (let [key] of Object.entries(MONTHS)) {
    array.push(toTitleCase(key));
  }
  return array;
}

/**
 * Retrieve an array of years specified by the argument bounds.
 * @param {number} [startYear] - The lower bound of the range.
 * Default is 40 years behind today.
 * @param {number} [endYear] - The upper bound of the range.
 * Default is 3 years ahead of today.
 * @returns {number[]} An array of the years within range.
 */
const getYearsInRange = (startYear, endYear) => {
  const year = (new Date()).getFullYear();
  if (!startYear) startYear = year - 40;
  if (!endYear) endYear = year + 3;

  const array = [];
  for (let i = startYear; i <= endYear; i++) array.push(i);
  return array;
}

/**
 * Custom date functions.
 * @module zavid-modules/date
 */
module.exports = {
  formatDate,
  formatISODate,
  getDateSuffix,

  formatTime,
  formatISOTime,

  formatDateTime,
  calculateAge,

  getDatesForMonth,
  getMonthByNumber,
  getAllMonths,
  getYearsInRange,

  MONTHS
}

/**
 * Retrieves the period of the hour.
 * @param {number} hour - An hour of the day.
 * @returns {string} The corresponding period.
 */
const getTimePeriod = (hour) => {
  return hour < 12 ? 'am' : 'pm'
}

/**
 * Convert hour to 12-hour convention.
 * @param {number} hour - An hour of the day.
 * @returns {number} The 12-hour format of the hour.
 */
const convertTo12HourNumber = (hour) => {
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour = hour - 12;
  }

  return hour;
}

/**
 * Converts a number to 2 significant figures.
 * @param {number} value - An integer value.
 * @returns {string} The converted number as a string.
 */
const makeDoubleDigit = (value) => {
  return value = (value < 10) ? '0' + value : value;
}