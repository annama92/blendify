import express from 'express';

import handleResponseError from '../utils/handleResponseError.js';

/**
 * Wrapper for `express.json()` that handles JSON errors.
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export default function handleJsonError(req, res, next) {
  express.json()(req, res, err => {
    if (err) {
      console.log(err);
      return res.status(400).send('Error 400: Error parsing body as JSON');
    }
    next();
  });
}