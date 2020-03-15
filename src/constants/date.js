/**
 * Custom date functions.
 * @module zavid-modules/date
 */
module.exports = {

  /**
   * Convert date to full string e.g. Monday 1st January 2020
   * @param {string} value - The date value to be converted.
   * @param {boolean} [withDay] - Option to include the day of the week.
   * @returns The full date string.
   */
  formatDate: (value, withDay) => {
    if (!value) return '-';
  
    let dt = new Date(value);
  
    let day_number = dt.getDay() + 1;
    let date = dt.getDate();
    let month_number = dt.getMonth() + 1;
    let year = dt.getFullYear();
    
    let day, month;
    
    switch(day_number) {
      case 1: day = "Sunday"; break;
      case 2: day = "Monday"; break;
      case 3: day = "Tuesday"; break;
      case 4: day = "Wednesday"; break;
      case 5: day = "Thursday"; break;
      case 6: day = "Friday"; break;
      case 7: day = "Saturday"; break;
    }
    
    switch(month_number) {
      case 1: month = "January"; break;
      case 2: month = "February"; break;
      case 3: month = "March"; break;
      case 4: month = "April"; break;
      case 5: month = "May"; break;
      case 6: month = "June"; break;
      case 7: month = "July"; break;
      case 8: month = "August"; break;
      case 9: month = "September"; break;
      case 10: month = "October"; break;
      case 11: month = "November"; break;
      case 12: month = "December"; break;
    }
  
    let result = `${date}${module.exports.getDateSuffix(date)} ${month} ${year}`;
    result = withDay ? `${day} ${result}` : result;
    
    return result;
  },

  /**
   * Convert datetime or time string to 12-hour time string e.g. 11:59pm
   * @param {string} value - The time value to be converted.
   * @returns The time in its new format.
   */
  formatTime: (value) => {
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
  
    let period = module.exports.getTimePeriod(hour);

    hour = module.exports.convertTo12HourNumber(hour);
    min = module.exports.doubleDigit(min);

    let result = `${hour}:${min}${period}`;
    return result;
  },

  /**
   * Convert datetime to full date and time string.
   * @param {string} value - The datetime value to be converted.
   * @returns A full datetime stirng.
   */
  formatDateTime: (value) => {
    if (!value) return '-';
    return `${module.exports.formatISOTime(value, false)} @ ${module.exports.formatDate(value)}`;
  },

  /**
   * Convert date to ISO format.
   * @param {string} date - The date value to be converted.
   * @returns An ISO version of the date.
   */
  formatISODate: (date) => {
    const value = new Date(date);
    let dd = module.exports.doubleDigit(value.getDate());
    let mm = module.exports.doubleDigit(value.getMonth() + 1);
    let yyyy = value.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  },

  /**
   * Convert datetime or time to ISO format.
   * @param {string} time - The time value to be converted.
   * @param {boolean} [withSeconds=true] - Option to include the seconds.
   * @returns An ISO version of the time.
   */
  formatISOTime: (time, withSeconds = true) => {
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

    hour = module.exports.doubleDigit(hour);
    min = module.exports.doubleDigit(min);
    sec = module.exports.doubleDigit(sec);

    let result = `${hour}:${min}`;
    if (withSeconds) result += `:${sec}`;

    return result;
  },

  /**
   * Calculates age from a provided date.
   * @param {string} date - The date of birth which the age will be calculated from.
   * @returns The calculated age.
   */
  calculateAge: (date) => {
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
  },

  /**
   * Retrieves the ordinal of the date.
   * @param {number} day - A day number of the month.
   * @returns The corresponding ordinal.
   */
  getDateSuffix: (day) => {
    let suffix = "";
    
    switch(day) {
      case 1: case 21: case 31: suffix = 'st'; break;
      case 2: case 22: suffix = 'nd'; break;
      case 3: case 23: suffix = 'rd'; break;
      default: suffix = 'th';
    }
    
    return suffix;
  },

  /**
   * Retrieves the period of the hour.
   * @param {number} hour - An hour of the day.
   * @returns The corresponding period.
   */
  getTimePeriod: (hour) => {
    return hour < 12 ? 'am' : 'pm'
  },

  /**
   * Convert hour to 12-hour convention.
   * @param {number} hour - An hour of the day.
   * @returns The 12-hour format of the hour.
   */
  convertTo12HourNumber: (hour) => {
    // TODO: Needs testing
    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour = hour - 12;
    }

    return hour;
  },

  /**
   * Converts a number to 2 significant figures.
   * @param {number} value - An integer value.
   * @returns The converted number as a string.
   */
  doubleDigit: (value) => {
    return value = (value < 10) ? '0' + value : value;
  }
}