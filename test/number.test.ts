import { assert } from 'chai';
import * as zNumber from '../src/constants/number';

describe('Number functions', function () {
  it('Make Double digit', function () {
    assert.strictEqual(zNumber.toDoubleDigit(9), "09");
    assert.strictEqual(zNumber.toDoubleDigit(20), "20");
  });

  it('Check random number is valid', function () {
    const start = 1;
    const end = 10;
    const number = zNumber.generateRandom(start, end);
    assert.isAbove(number, start - 1);
    assert.isBelow(number, end + 1);
  });
});
