const assert = require('chai').assert;
const date = require('../constants/date.js');

describe('Date functions', () => {
    it('Format full date', done => {
        const dt = '1996-12-02';
        const fullDate = date.formatDate(dt);
        assert.equal(date.formatDate(dt), '2nd December 1996');
        assert.equal(fullDate, '2nd December 1996');
        done();
    });

    it('Format full date with day of week', done => {
        const dt = '1996-12-02';
        const fullDate = date.formatDate(dt, true);
        assert.equal(fullDate, 'Monday 2nd December 1996');
        done();
    });
    
    it('Calculate age from birthday', done => {
        const birthday = '1996-12-02';
        const age = date.calculateAge(birthday);

        const dt = new Date(birthday);
        const now = dt.getTime();

        assert.equal(age, 23); // TODO: Make dynamic
        // assert.equal(age, now / (365 * 24 * 3600000));
        done();
    });
});
