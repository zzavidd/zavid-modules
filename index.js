const alerts = require('./components/alert');

const date = require('./constants/date');
const handlers = require('./constants/handlers');
const request = require('./constants/request');

module.exports = {
  zAlerts: alerts,

  zDate: date,
  zHandlers: handlers,
  zRequest: request
}