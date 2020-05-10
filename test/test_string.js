const assert = require('chai').assert;
const zString = require('../src/constants/string.js');

describe('String functions', function () {
  const list = ['Abuja', 'Edo', 'Kaduna'];

  it('Punctuate list with default conjunction ', function () {
    const punctuatedList = zString.toPunctuatedList(list);
    assert.equal(punctuatedList, 'Abuja, Edo & Kaduna');
  });

  it('Punctuate list with custom conjunction', function () {
    const punctuatedListAnd = zString.toPunctuatedList(list, 'and');
    assert.equal(punctuatedListAnd, 'Abuja, Edo and Kaduna');
  });

  it('Create a clean slug', function () {
    const title = 'Olaoluwa and Joseph from a town in Lagos';
    const expectedOutput = 'olaoluwa-joseph-from-town-in-lagos';
    assert.equal(zString.constructCleanSlug(title), expectedOutput);
  });

  it('Construct a simple slug from a name', function () {
    const name = 'Chyna Anne-McClain';
    const expectedOutput = 'chynaam';
    assert.equal(zString.constructSimpleNameSlug(name), expectedOutput);
  });

  it('Transform comma-separated list into array', function () {
    const list = 'woke, black women, nice, ';
    const expectedOutput = ['woke', 'black women', 'nice'];
    assert.deepEqual(zString.convertCsvToArray(list), expectedOutput);
  });

  it('Transform array of strings into comma-separated list', function () {
    const list = ['array', 'of', 'strings', ''];
    const expectedOutput = 'array, of, strings';
    assert.equal(zString.convertArrayToCsv(list), expectedOutput);
  });
});
