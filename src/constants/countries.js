const zRequest = require('../constants/request.js');
const zString = require('../constants/string.js');

/**
 * Retrieve demonym from country
 * @param {Callback} callback - The function to execute once data is returned.
 */
const loadCountries = (callback) => {
  zRequest({
    url: 'https://restcountries.eu/rest/v2/all',
    onSuccess: callback
  });
};

/**
 * Retrieve demonym from country
 * @param {string} value - The name of the country to retrieve the demonym for.
 * @param {Object[]} data - The list of countries loaded from {@link loadCountries}.
 */
const getDemonym = (value, data) => {
  const matchedCountry = data.find((country) => country.name === value);
  return matchedCountry ? matchedCountry.demonym : value;
};

/**
 * Display a comma-separated list of countries from array.
 * @param {string[]} countries - The selected countries to be displayed as a list of demonyms.
 * @param {Object[]} data - The list of countries loaded from {@link loadCountries}.
 */
const demonymsToString = (countries, data) => {
  if (!countries) return '';

  const array = [];
  countries.forEach((country) => {
    if (!country || country === '') return;
    var demonym = module.exports.getDemonym(country, data);
    array.push(demonym);
  });

  const str = zString.toPunctuatedList(array);
  return str;
};

module.exports = {
  loadCountries,
  getDemonym,
  demonymsToString
};

/**
 * Function triggered on successful request.
 * @callback Callback
 */
