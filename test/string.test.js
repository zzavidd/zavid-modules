const assert = require('chai').assert;
const zString = require('../src/constants/string.js');

describe('String functions', function () {
  const list = ['Abuja', 'Edo', 'Kaduna'];

  it('Punctuate list ', function () {
    const defaultConjunction = zString.toPunctuatedList(list);
    assert.equal(defaultConjunction, 'Abuja, Edo & Kaduna');

    const customConjunction = zString.toPunctuatedList(list, 'and');
    assert.equal(customConjunction, 'Abuja, Edo and Kaduna');
  });

  it('Create a clean slug', function () {
    const title1 = 'Olaoluwa and Joseph';
    const title2 = 'from a town in Lagos';
    let expected = 'olaoluwa-joseph-from-town-in-lagos';
    assert.equal(zString.constructCleanSlug(title1, title2), expected);

    const title3 = 'A Letter To Chidera';
    expected = 'letter-to-chidera';
    assert.equal(zString.constructCleanSlug(title3), expected);

    const title4 = 'Men Are Trash...Sigh';
    expected = 'men-are-trash-sigh';
    assert.equal(zString.constructCleanSlug(title4), expected);
  });

  it('Construct a simple slug from a name', function () {
    const name = 'Chyna Anne-McClain';
    const expected = 'chynaam';
    assert.equal(zString.constructSimpleNameSlug(name), expected);
  });

  it('Transform comma-separated list into array', function () {
    const list = 'woke, black women, nice, ';
    const expected = ['woke', 'black women', 'nice'];
    assert.deepEqual(zString.convertCsvToArray(list), expected);
  });

  it('Transform array of strings into comma-separated list', function () {
    const list = ['array', 'of', 'strings', ''];
    const expected = 'array, of, strings';
    assert.equal(zString.convertArrayToCsv(list), expected);
  });
});
