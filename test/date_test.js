const assert = require('chai').assert;
const zDate = require('../src/constants/date.js');

describe('Date functions', function() {
  const datetime = '1996-12-02T01:00:00';
  const datetimePM = '1996-12-02T23:59:59';

  it('Format full date', function() {
    const fullDate = zDate.formatDate(datetime);
    assert.equal(fullDate, '2nd December 1996');
  });

  it('Format full date with day of week', function() {
    const fullDate = zDate.formatDate(datetime, true);
    assert.equal(fullDate, 'Monday 2nd December 1996');
  });

  it('Format to time', function() {
    assert.equal(zDate.formatTime(datetime), '1:00am');
    assert.equal(zDate.formatTime(datetimePM), '11:59pm');
  });

  it('Format to full date and time', function() {
    const fullDateTimeAM = zDate.formatDateTime(datetime, false);
    const fullDateTimePM = zDate.formatDateTime(datetimePM, false);
    assert.equal(fullDateTimeAM, '01:00 @ 2nd December 1996');
    assert.equal(fullDateTimePM, '23:59 @ 2nd December 1996');
  });

  it('Format to ISO date', function() {
      const isoDate = zDate.formatISODate(datetime);
      assert.equal(isoDate, '1996-12-02');
  });

  it('Format to ISO time', function() {
    const isoTime = zDate.formatISOTime(datetime, true);
    const isoTimePM = zDate.formatISOTime(datetimePM, true);
    assert.equal(isoTime, '01:00:00');
    assert.equal(isoTimePM, '23:59:59');
  });
  
  it('Calculate age from birthday', function() {
    const birthday = '1996-12-02';
    const age = zDate.calculateAge(birthday);
    assert.equal(age, 23);
    
    // TODO: Make dynamic
    // const dt = new Date(birthday);
    // const now = dt.getTime();
    // assert.equal(age, now / (365 * 24 * 3600000))
  });

  it('Get date ordinal suffix', function() {
    const expect = function(actual, expected) {
      assert.equal(zDate.getDateSuffix(actual), expected);
    }

    for (let i = 1; i < 31; i++) {
      switch(i) {
        case 1: case 21: case 31: expect(i, 'st'); break;
        case 2: case 22: expect(i, 'nd'); break;
        case 3: case 23: expect(i, 'rd'); break;
        default: expect(i, 'th');
      }
    }
  });
});
