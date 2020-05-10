const axios = require('axios');

/**
 * Abstract function for HTTP requests.
 * @module zavid-modules/request
 * @param {string} request.url - The url to make the request to.
 * @param {string} [request.method] - The method of the request. Defaults to GET.
 * @param {Object} [request.body] - The payload for the request.
 * @param {Object} [request.headers] - The headers to accompany the request.
 * @param {onSuccessCallback} request.onSuccess - Function triggered on successful request.
 * @param {onErrorCallback} [request.onError] - Function triggered when request fails.
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

  axios({
    url,
    method,
    data: body,
    headers
  })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error.message);
    });
};

/**
 * Function triggered on successful request.
 * @callback onSuccessCallback
 */

/**
 * Function triggered when request fails.
 * @callback onErrorCallback
 */
