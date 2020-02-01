/**
 * Abstract function for requests.
 * @param {string} url - The url to make the request to.
 * @param {string} method - The method of the request. Defaults to GET.
 * @param {string} body - The payload for the request.
 * @param {string} headers - The headers to accompany the request.
 * @param {string} onSuccess - Function triggered on successful request.
 * @param {string} onError - Function triggered when request fails.
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