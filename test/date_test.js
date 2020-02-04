const assert = require('chai').assert;
const zDate = require('../src/constants/date.js');

describe('Date functions', function() {
  const datetime = '1996-12-02T08:39:39';

  it('Format full date', function() {
    const fullDate = zDate.formatDate(datetime);
    assert.equal(fullDate, '2nd December 1996');
  });

  it('Format full date with day of week', function() {
    const fullDate = zDate.formatDate(datetime, true);
    assert.equal(fullDate, 'Monday 2nd December 1996');
  });

  it('Format to time', function() {
    const formattedTime = zDate.formatTime(datetime);
    assert.equal(formattedTime, '08:39');
  });

  it('Format to full date and time', function() {
    const fullDateTime = zDate.formatDateTime(datetime);
    assert.equal(fullDateTime, '08:39 @ 2nd December 1996');
  });

  it('Format to ISO date', function() {
      const isoDate = zDate.formatISODate(datetime);
      assert.equal(isoDate, '1996-12-02');
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
});
