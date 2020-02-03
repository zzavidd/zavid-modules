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

  it('Get demonym', done => {
    const demonym = zCountries.getDemonym('Nigeria', allCountries);
    assert.equal(demonym, 'Nigeria');
    done();
  });

  it('List demonyms', done => {
    const countries = ['Nigeria', 'Ghana', 'Jamaica'];
    const demonymList = zCountries.demonymsToString(countries, allCountries);
    assert.equal(demonymList, 'Nigerian, Ghanaian & Jamaican');
    done();
  });
});
