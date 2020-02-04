const alerts = require('./components/alert');
const form = require('./components/form');

const countries = require('./constants/countries');
const date = require('./constants/date');
const handlers = require('./constants/handlers');
const request = require('./constants/request');
const string = require('./constants/string');

module.exports = {
  zAlerts: alerts,
  zForm: form,
  
  zCountries: countries,
  zDate: date,
  zHandlers: handlers,
  zRequest: request,
  ZString: string
}