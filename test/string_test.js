const assert = require('chai').assert;
const zString = require('../src/constants/string.js');

describe('String functions', function() {
    const list = ['Abuja', 'Edo', 'Kaduna'];

    it('Punctuate list with default conjunction ', function() {
        const punctuatedList = zString.toPunctuatedList(list);
        assert.equal(punctuatedList, 'Abuja, Edo & Kaduna');
    });

    it('Punctuate list with custom conjunction', function() {
        const punctuatedListAnd = zString.toPunctuatedList(list, 'and');
        assert.equal(punctuatedListAnd, 'Abuja, Edo and Kaduna');
    });
});
