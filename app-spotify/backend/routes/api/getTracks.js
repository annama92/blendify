import express from 'express';
import axios from 'axios';

import { spotifyDefaultConfig } from '../../utils/constants.js';
import includeAudioFeatures from '../../utils/includeAudioFeatures.js';
import handleResponseError from '../../utils/handleResponseError.js';

const { respones } = express;

/**
 * Get the user's "liked songs" with track attributes
 * (acousticness, danceability, energy, instrumentalness, popularity, speechiness,
 * valence) attached as properties in a `features` object property.
 * 
 * Response: An array of tracks as JSON objects.
 * @param {express.Request} req 
 * @param {express.Result} res
 */
export default async function getTracks(req, res) {
  // The spotify API only allows retrieving a max of 50 tracks at a time.
  // To get all tracks, we continually call the API until there are no more tracks left
  const accessToken = req.session.authToken.accessToken;
  const config = {
    ...spotifyDefaultConfig(accessToken),
    params: {
      limit: 50, // max number of tracks to return in one API call
      offset: 0, // offset of items (to get the next set of items)
    }
  }

  let result = [];
  try {
    do {
      const response = await axios.get('v1/me/tracks', config);
      // concatenate the new tracks to a cumulative total
      // we are only interested in the `track` property of the item
      result = result.concat(response.data.items.map(item => item.track));
      // get the next page on the next request
      config.params.offset += config.params.limit;
      // next == null when there are no more resulsts
    } while (response.data?.next)
    console.log(`Retrieved ${result.length} songs`);
    result = await includeAudioFeatures(result, accessToken);
    res.send({ tracks: result });
  } catch (err) {
    handleResponseError(res, err);
  }
}

