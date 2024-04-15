import express from 'express';
import axios from 'axios';

import {
  clientId,
  clientSecret,
  authStateKey,
  authRedirect,
} from '../../utils/constants.js';
import getUnixTimestamp from '../../utils/unixTime.js';
import handleResponseError from '../../utils/handleResponseError.js';

/**
 * Request an authentication token from the Spotify API and store it in the session variable
 * `authToken`.
 * The request should pass the authentication code as a query parameter.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function requestAuthToken(req, res) {
  // Retrieve the auth code from the query parameter
  const code = req.query.code || null;

  // state parameter returned by OAuth that should match the one initially passed during
  // authorization
  const authState = req.query.state || null;
  // authorization state initially passed
  const expectedAuthState = req.cookies ? req.cookies[authStateKey] : null;

  if (!authState || !expectedAuthState || authState !== expectedAuthState) {
    // authorization state are not valid or don't match: authorization is invalid
    sendError(res, 400, "OAuth state mismatch: retrieve an authorization token with GET /auth/code.");
  } else {
    // authorization is valid => retrieve the auth token with the auth code
    res.clearCookie(authStateKey); // auth state no longer needed
    try {
      const authToken = await requestAuthTokenHelper({ code });
      req.session.authToken = authToken;
      console.log('Retrieved authorization token');
      console.dir(authToken);
      res.redirect('http://localhost:3000/attribute');
    } catch (error) {
      handleResponseError(res, error);
    }
  }
}

/**
 * Refresh the current authentication token with the current refresh token.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function refreshAuthToken(req, res) {
  // Retrieve the refresh token stored in the session variable
  const refreshToken = req.session.authToken ? req.session.authToken.refreshToken : null;

  if (!refreshToken) {
    sendError(res, 500, "Failed to refresh authorization token: an existing authorization token does not exist!");
  } else {
    // Request a new authorization token using the refresh token
    // (instead of the authorization code)
    try {
      const authToken = await requestAuthTokenHelper({ refresh_token: refreshToken });
      // Spotify API does not send back the old refresh token: we append it again here
      authToken.refreshToken = refreshToken;
      req.session.authToken = authToken;
      console.log('Refreshed authorization token');
      console.dir(authToken);
    } catch (error) {
      handleResponseError(res, error);
    }
  }
}

/**
 * The auth token to be stored in the session variable.
 * @typedef {Object} AuthToken
 * @property {string} accessToken The access token to be provided in subsequent API calls.
 * @property {string} scope A space-separated list of scopes which have been granted for this access token.
 * @property {number} expiry The unix time stamp when the access token expires.
 * @property {string} refreshToken A token that can be sent to refresh an expiring access token.
 */

/**
 * Retrieve the auth with a given authorization code or a refresh token. Returns the auth token.
 * https://developer.spotify.com/documentation/general/guides/authorization/code-flow/#request-access-token
 * @param {object} exchange object containing `refresh_token` property or `code` property, depending on if 
 *                          the access token request is made with a refresh token or authorization code.
 */
async function requestAuthTokenHelper(exchange) {
  // options to be passed to the POST request
  const config = {
    baseURL: 'https://accounts.spotify.com',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const data = new URLSearchParams({
    ...exchange,
    grant_type: exchange.refresh_token ? 'refresh_token' : 'authorization_code',
    redirect_uri: authRedirect,
  })
  // make the POST request and process the response
  const response = await axios.post('api/token', data, config);
  const { access_token, scope, expires_in, refresh_token } = response.data;
  const authToken = {
    accessToken: access_token,
    scope,
    expiry: getUnixTimestamp() + expires_in,
    refreshToken: refresh_token,
  }
  return authToken;
}