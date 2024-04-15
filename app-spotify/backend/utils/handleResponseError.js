/**
 * Print information about an error caught from an HTTP request
 * @param {*} error the error caught from an HTTP request
 */
export default function handleResponseError(res, error) {
  const status = error.response?.status;
  let message = error.message;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(status);
    console.log(error.response.headers);
    // use more descriptive error message if available
    message = `${message}: ${error.response.data.error.message}`;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
  res.status(status).send(`
    <h1>Error ${status}</h1>
    <p>${message}</p>
  `);
}