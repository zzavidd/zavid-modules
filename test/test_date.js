const assert = require('chai').assert;
const zDate = require('../src/constants/date.js');

describe('Date functions', function () {
  const datetime = '1996-12-02T01:00:00';
  const datetimePM = '1996-12-02T23:59:59';

  it('Format full date', function () {
    const fullDate = zDate.formatDate(datetime);
    assert.equal(fullDate, '2nd December 1996');
  });

  it('Format full date with day of week', function () {
    const fullDate = zDate.formatDate(datetime, true);
    assert.equal(fullDate, 'Monday 2nd December 1996');
  });

  it('Format to time', function () {
    assert.equal(zDate.formatTime(datetime), '1:00am');
    assert.equal(zDate.formatTime(datetimePM), '11:59pm');
  });

  it('Format to full date and time', function () {
    const fullDateTimeAM = zDate.formatDateTime(datetime, false);
    const fullDateTimePM = zDate.formatDateTime(datetimePM, false);
    assert.equal(fullDateTimeAM, '01:00, 2nd December 1996');
    assert.equal(fullDateTimePM, '23:59, 2nd December 1996');
  });

  it('Format to ISO date', function () {
    const isoDate = zDate.formatISODate(datetime);
    assert.equal(isoDate, '1996-12-02');
  });

  it('Format to ISO time', function () {
    const isoTime = zDate.formatISOTime(datetime, true);
    const isoTimePM = zDate.formatISOTime(datetimePM, true);
    assert.equal(isoTime, '01:00:00');
    assert.equal(isoTimePM, '23:59:59');
  });

  it('Calculate age from birthday', function () {
    const birthday = '1996-12-02';
    const age = zDate.calculateAge(birthday);

    const date = new Date(birthday);
    const today = new Date();
    const expectedAge = Math.abs(date - today) / (365 * 24 * 3600000);
    assert.equal(age, Math.floor(expectedAge));
  });

  it('Get days for specified month', function () {
    const noMonth = zDate.getDatesForMonth();
    const oddMonth = zDate.getDatesForMonth(zDate.MONTHS.JANUARY.NAME);
    const evenMonth = zDate.getDatesForMonth(zDate.MONTHS.JUNE.NAME);
    const intercalaryMonth = zDate.getDatesForMonth(zDate.MONTHS.FEBRUARY.NAME);

    assert.lengthOf(noMonth, 31);
    assert.lengthOf(oddMonth, 31);
    assert.lengthOf(evenMonth, 30);
    assert.lengthOf(intercalaryMonth, 29);
  });

  it('Get month by number', function () {
    const month = zDate.getMonthByNumber(1);
    assert.equal(month, 'January');
  });

  it('Get all months', function () {
    const months = zDate.getAllMonths();
    assert.equal(months[0], 'January');
    assert.lengthOf(months, 12);
  });

  it('Get years within range', function () {
    const startYear = 1950;
    const endYear = 2030;

    const noYears = zDate.getYearsInRange();
    const specifiedYears = zDate.getYearsInRange(startYear, endYear);

    const thisYear = new Date().getFullYear();

    assert.equal(noYears[0], thisYear - 40);
    assert.equal(noYears[noYears.length - 1], thisYear + 3);
    assert.equal(specifiedYears[0], startYear);
    assert.equal(specifiedYears[specifiedYears.length - 1], endYear);
  });

  it('Get all hours', function () {
    const hours = zDate.getAllHours();
    assert.lengthOf(hours, 24);
  });

  it('Get all minutes', function () {
    const noIncrement = zDate.getAllMinutes();
    const fiveIncrement = zDate.getAllMinutes(5);

    assert.lengthOf(noIncrement, 60);
    assert.equal(noIncrement[noIncrement.length - 1].value, 59);
    assert.lengthOf(fiveIncrement, 12);
    assert.equal(fiveIncrement[fiveIncrement.length - 1].value, 55);
  });
});
