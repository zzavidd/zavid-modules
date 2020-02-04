const assert = require('chai').assert;
const zCountries = require('../src/constants/countries.js');

describe('Country functions', () => {
  let allCountries;

  it('Load countries', done => {
    zCountries.loadCountries(data => {
      allCountries = data;
      assert.isArray(data);
      done();
    });
  });

  it('Retrieve country\'s demonym', done => {
    const demonym = zCountries.getDemonym('Nigeria', allCountries);
    assert.equal(demonym, 'Nigerian');
    done();
  });

  it('List demonyms as string', done => {
    const countries = ['Nigeria', 'Ghana', 'Jamaica'];
    const demonymList = zCountries.demonymsToString(countries, allCountries);
    assert.equal(demonymList, 'Nigerian, Ghanaian & Jamaican');
    done();
  });
});
