import express from 'express';

import getUnixTimestamp from '../../utils/unixTime.js';
import { refreshAuthToken } from './token.js';

/**
 * Check if an authorization token exists for the current user.
 * If the authorization token is expired, refresh it.
 * If the user is not authorized, an error is sent. 
 * @param {express.Request} req 
 * @param {express.Response} res
 * @param {function} next
 */
export default function checkAuth(req, res, next) {
  const authToken = req.session?.authToken || null;
  if (!authToken) {
    res.status(401).send('The client is unauthorized: GET /auth/code first');
  } else {
    // refresh the authorization token if expired
    // give additional minute buffer for refresh to account for any delays
    if (authToken.expiry + 60 <= getUnixTimestamp()) {
      // refresh the token
      refreshAuthToken(req, res);
    }
    next();
  }
 }