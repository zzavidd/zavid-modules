const assert = require('chai').assert;
const zLogic = require('../src/constants/logic.js');

describe('Logic tests', function () {
  describe('Falsy Verify', function () {
    const isTrue = (...values) => assert.isTrue(zLogic.isFalsy(...values));
    const isFalse = (...values) => assert.isFalse(zLogic.isFalsy(...values));

    describe('Check falsy values return true', function () {
      it('Test single falsy value', function () {
        isTrue(undefined);
      });

      it('Test multiple falsy values', function () {
        isTrue(undefined, '', false, 0, null, [], {});
      });
    });

    describe('Check truthy values return true', function () {
      it('Test single truthy value', function () {
        isFalse('truthy');
      });

      it('Test 1 truthy, 1 falsy', function () {
        isFalse(['truthy'], '');
      });

      it('Test 1 falsy, 1 truthy', function () {
        isFalse({}, { truthy: true });
      });
    });
  });
});
