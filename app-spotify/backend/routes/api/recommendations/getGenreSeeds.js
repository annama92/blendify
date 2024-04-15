import axios from 'axios';
import express from 'express';

import { spotifyDefaultConfig } from '../../../utils/constants.js';
import handleResponseError from '../../../utils/handleResponseError.js';

/**
 * Get a list of possible genre seeds that can be passed as query parameters
 * to `GET api/recommendations`.
 * @param {express.Request} req
 * @param {express.Result} res
 */
export default async function getGenreSeeds(req, res) {
  const { accessToken } = req.session?.authToken;
  const config = spotifyDefaultConfig(accessToken);

  try {
    const response = await axios.get('v1/recommendations/available-genre-seeds', config);
    const { genres } = response.data;
    console.log(`Retrieved ${genres.length} genre seeds`);
    res.send({ genres });
  } catch (err) {
    handleResponseError(res, err);
  }
}