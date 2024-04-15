import axios from 'axios';
import express from 'express';

import { spotifyDefaultConfig } from '../../../utils/constants.js';
import handleResponseError from '../../../utils/handleResponseError.js';
import includeAudioFeatures from '../../../utils/includeAudioFeatures.js';

/**
 * Get a list of recommendations from up to 5 seed values
 * corresponding to target values for audio features.
 * @param {express.Request} req 
 * @param {express.Result} res 
 */
export default async function getRecommendations(req, res) {
  const accessToken = req.session?.authToken?.accessToken;
  // pull values from request query
  const {
    seed_artists,
    seed_genres,
    seed_tracks,
    limit,
    acousticness,
    danceability,
    energy,
    instrumentalness,
    popularity,
    speechiness,
    tempo,
    valence
  } = req.query;
  // config for GET request
  const config = {
    ...spotifyDefaultConfig(accessToken),
    params: {
      seed_artists,
      seed_genres,
      seed_tracks,
      limit,
      target_acousticness: acousticness,
      target_danceability: danceability,
      target_energy: energy,
      target_instrumentalness: instrumentalness,
      target_popularity: popularity,
      target_speechiness: speechiness,
      target_tempo: tempo,
      target_valence: valence,
    },
  };

  // perform GET request
  try {
    const response = await axios.get('v1/recommendations', config);
    const tracks = await includeAudioFeatures(response.data.tracks, accessToken);
    console.log(`Retrieved ${tracks.length} recommendations`);
    res.send({ tracks });
  } catch (err) {
    handleResponseError(res, err);
  }
}