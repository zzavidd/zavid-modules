const assert = require('chai').assert;
const zLogic = require('../src/constants/logic.js');

describe('Logic tests', function () {
  it('Check value is falsy', function () {
    let emptyValue;
    assert.isTrue(zLogic.isFalsy(emptyValue));

    emptyValue = null;
    assert.isTrue(zLogic.isFalsy(emptyValue));

    emptyValue = '';
    assert.isTrue(zLogic.isFalsy(emptyValue));

    emptyValue = 12 / 'twelve';
    assert.isTrue(zLogic.isFalsy(emptyValue));
  });
});
