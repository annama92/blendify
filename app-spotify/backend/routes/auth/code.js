import express from 'express';
import { URLSearchParams } from 'url';

import {
  clientId,
  authRedirect,
  authStateKey
} from '../../utils/constants.js';

/**
 * Generate a random string suitable for a URL parameter
 * @param {number} length length of the string to generate
 * @returns the randomly generated string
 */
function randomURLParam(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; ++i) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Retrieve an authorization code from the Spotify API.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export function authCode(req, res) {
  // Generate a random state to prevent cross-site request forgery
  // https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
  const authState = randomURLParam(16);
  // store state paremeter to be verified with the state returned by OAuth
  res.cookie(authStateKey, authState);

  // scopes accessible via the API
  // https://developer.spotify.com/documentation/general/guides/authorization/scopes/
  const scope = 'user-library-read playlist-modify-public';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: authRedirect,
    state: authState,
  });

  res.redirect('https://accounts.spotify.com/authorize?' + params.toString());
}
