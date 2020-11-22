import { assert } from 'chai';
import * as zDate from '../src/constants/date';

describe('Date functions', function () {
  const datetime = '1996-12-02T01:00:00';
  const datetimePM = '1996-12-02T23:59:59';

  it('Format full date', function () {
    const expectedDate = '2nd December 1996';

    const dateFromString = zDate.formatDate(datetime);
    const dateFromDate = zDate.formatDate(new Date(1996, 11, 2));
    const dateFromNumber = zDate.formatDate(849484800000);
    const dateFromNumberString = zDate.formatDate('849484800000');

    assert.equal(dateFromString, expectedDate);
    assert.equal(dateFromDate, expectedDate);
    assert.equal(dateFromNumber, expectedDate);
    assert.equal(dateFromNumberString, expectedDate);
  });

  it('Format full date with day of week', function () {
    const fullDate = zDate.formatDate(datetime, { withWeekday: true });
    assert.equal(fullDate, 'Monday 2nd December 1996');
  });

  it('Format to time', function () {
    assert.equal(zDate.formatTime(datetime), '1:00am');
    assert.equal(zDate.formatTime(datetimePM), '11:59pm');
  });

  it('Format to full date and time', function () {
    const fullDateTimeAM = zDate.formatDateTime(datetime);
    const fullDateTimePM = zDate.formatDateTime(datetimePM);
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

    const date = new Date(birthday).getTime();
    const today = new Date().getTime();
    const expectedAge = Math.abs(date - today) / (365 * 24 * 3600000);
    assert.equal(age, Math.floor(expectedAge));
  });

  it('Get days for specified month', function () {
    const noMonth = zDate.getDatesForMonth();
    const oddMonth = zDate.getDatesForMonth(zDate.MONTH.JANUARY);
    const evenMonth = zDate.getDatesForMonth(zDate.MONTH.JUNE);
    const intercalaryMonth = zDate.getDatesForMonth(zDate.MONTH.FEBRUARY);

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
    assert.equal(noIncrement[noIncrement.length - 1].value, '59');
    assert.lengthOf(fiveIncrement, 12);
    assert.equal(fiveIncrement[fiveIncrement.length - 1].value, '55');
  });
});
