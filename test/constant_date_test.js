const assert = require('chai').assert;
const zDate = require('../constants/date.js');
const zRequest = require('../constants/request.js');

zRequest();

describe('Date functions', () => {
    const datetime = '1996-12-02T08:39:39';

    it('Format full date', done => {
        const fullDate = zDate.formatDate(datetime);
        assert.equal(fullDate, '2nd December 1996');
        done();
    });

    it('Format full date with day of week', done => {
        const fullDate = zDate.formatDate(datetime, true);
        assert.equal(fullDate, 'Monday 2nd December 1996');
        done();
    });

    it('Format to time', done => {
        const formattedTime = zDate.formatTime(datetime);
        assert.equal(formattedTime, '08:39');
        done();
    });

    it('Format to full date and time', done => {
        const fullDateTime = zDate.formatDateTime(datetime);
        assert.equal(fullDateTime, '08:39 @ 2nd December 1996');
        done();
    });

    // it('Format to ISO date', done => {
    //     const datetime2 = 'Monday 2nd December 1996';
    //     const isoDate = zDate.formatISODate(datetime2);
    //     assert.equal(isoDate, '1996-12-02');
    //     done();
    // });
    
    it('Calculate age from birthday', done => {
        const birthday = '1996-12-02';
        const age = zDate.calculateAge(birthday);
        assert.equal(age, 23);
        
        // TODO: Make dynamic
        // const dt = new Date(birthday);
        // const now = dt.getTime();
        // assert.equal(age, now / (365 * 24 * 3600000))

        done();
    });
});
