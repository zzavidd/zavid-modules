const form = require('./components/form');

const countries = require('./constants/countries');
const date = require('./constants/date');
const file = require('./constants/file');
const handlers = require('./constants/handlers');
const request = require('./constants/request');
const string = require('./constants/string');

module.exports = {
  zForm: form,
  
  zCountries: countries,
  zDate: date,
  zFile: file,
  zHandlers: handlers,
  zRequest: request,
  zString: string
}