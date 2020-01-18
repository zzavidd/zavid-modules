const alerts = require('./components/alert');
const form = require('./components/form');

const date = require('./constants/date');
const handlers = require('./constants/handlers');
const request = require('./constants/request');

module.exports = {
  zAlerts: alerts,
  zForm: form,

  zDate: date,
  zHandlers: handlers,
  zRequest: request
}