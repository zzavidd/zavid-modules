const form = require('./components/form');

const countries = require('./constants/countries');
const date = require('./constants/date');
const file = require('./constants/file');
const handlers = require('./constants/handlers');
const logic = require('./constants/logic');
const number = require('./constants/number');
const request = require('./constants/request');
const string = require('./constants/string');
const text = require('./constants/text');

module.exports = {
  zForm: form,

  zCountries: countries,
  zDate: date,
  zFile: file,
  zHandlers: handlers,
  zLogic: logic,
  zNumber: number,
  zRequest: request,
  zString: string,
  zText: text
};
