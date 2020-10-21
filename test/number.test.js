const assert = require('chai').assert;
const zNumber = require('../src/constants/number.js');

describe('Number functions', function () {
  it('Check random number is valid', function () {
    const start = 1;
    const end = 10;
    const number = zNumber.generateRandom(start, end);
    assert.isAbove(number, start);
    assert.isBelow(number, end);
  });
});
