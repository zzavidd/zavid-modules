const assert = require('chai').assert;
const zCountries = require('../src/constants/countries.js');

describe('Country functions', function () {
  let allCountries;

  it('Load countries', function (done) {
    this.slow(3000);
    zCountries.loadCountries(function (data) {
      allCountries = data;
      assert.isArray(data);
      done();
    });
  });

  it("Retrieve country's demonym", function () {
    const demonym = zCountries.getDemonym('Nigeria', allCountries);
    assert.equal(demonym, 'Nigerian');
  });

  it('List demonyms as string', function () {
    const countries = ['Nigeria', 'Ghana', 'Jamaica'];
    const demonymList = zCountries.demonymsToString(countries, allCountries);
    assert.equal(demonymList, 'Nigerian, Ghanaian & Jamaican');
  });
});
