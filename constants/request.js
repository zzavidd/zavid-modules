/**
 * Abstract function for requests.
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
  url = `/api${url}`;
  
  fetch(url, { method, body, headers })
  .then(res => Promise.all([res, res.json()]))
  .then(([status, response]) => { 
    if (status.ok){
      onSuccess(response);
    } else {
      onError(response.message);
    }
  }).catch(error => {
    onError(error);
  });
}

/**
 *  Function triggered on successful request.
 *  @callback onSuccessCallback
 */

 /**
 *  Function triggered when request fails.
 *  @callback onErrorCallback
 */