const assert = require('chai').assert;
const zLogic = require('../src/constants/logic.js');

describe('Logic tests', function () {
  describe('Test falsy verification', function () {
    describe('Check falsy values return true', function () {
      it('Test undefined', function () {
        let falsyValue;
        assert.isTrue(zLogic.isFalsy(falsyValue));
      });

      it('Test null', function () {
        const falsyValue = null;
        assert.isTrue(zLogic.isFalsy(falsyValue));
      });

      it('Test empty string', function () {
        const falsyValue = '';
        assert.isTrue(zLogic.isFalsy(falsyValue));
      });

      it('Test empty array', function () {
        const falsyValue = [];
        assert.isTrue(zLogic.isFalsy(falsyValue));
      });

      it('Test empty object', function () {
        const falsyValue = {};
        assert.isTrue(zLogic.isFalsy(falsyValue));
      });
    });

    describe('Check truthy values return false', function () {
      it('Test occupied string', function () {
        const truthyValue = 'truthy';
        assert.isFalse(zLogic.isFalsy(truthyValue));
      });

      it('Test occupied array', function () {
        const truthyValue = ['truthy'];
        assert.isFalse(zLogic.isFalsy(truthyValue));
      });

      it('Test occupied object', function () {
        const truthyValue = { truthy: true };
        assert.isFalse(zLogic.isFalsy(truthyValue));
      });
    });
  });
});
