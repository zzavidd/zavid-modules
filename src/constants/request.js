const request = require('request-promise');

/**
 * Abstract function for HTTP requests.
 * @module zavid-modules/request
 * @param {string} request.url - The url to make the request to.
 * @param {string} [request.method=GET] - The method of the request. Defaults to GET.
 * @param {Object} [request.body] - The payload for the request.
 * @param {Object} [request.headers={}] - The headers to accompany the request.
 * @param {onSuccessCallback} request.onSuccess - Function triggered on successful request.
 * @param {onErrorCallback} [request.onError=console.error] - Function triggered when request fails.
 */
module.exports = ({
  url,
  method = 'GET',
  body,
  headers = {},
  onSuccess,
  onError = console.error
}) => {
  headers['Content-Type'] = 'application/json';
  
  request(url, { method, body, headers })
  .then(response => {
    const json = JSON.parse(response);
    onSuccess(json);
  }, error => {
    onError(error);
  })
}

/**
 * Function triggered on successful request.
 * @callback onSuccessCallback
 */

 /**
 * Function triggered when request fails.
 * @callback onErrorCallback
 */