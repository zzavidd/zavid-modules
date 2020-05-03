const assert = require('chai').assert;
const zFile = require('../src/constants/file.js');

describe('File functions', function() {
  it('Check file is base64 encoded string', function() {
    const image = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    assert.isTrue(zFile.checkBase64(image));
  });
});