import axios from 'axios';

import { spotifyBaseUrl, authHeader } from './constants.js';

/**
 * Append audio features such as acousticness, danceability, energy, instrumentalness,
 * speechiness, and valence to each of the track objects in `result`
 * as separate proprties. Note that "popularity" is not an audio feature of the track;
 * it is included by default in the track information returned by the Spotify API.
 * 
 * The `result` array parameter is modified to include the new attributes.
 * @param {[Object]} result Array of tracks to add audio features to
 * @param {string} accessToken Spotify API access token
 * @returns {Promise<[Object]>} The array of tracks with the audio features included as properties
 *                     on the object.
 */
export default async function includeAudioFeatures(result, accessToken) {
  const config = {
    baseURL: spotifyBaseUrl,
    headers: {
      ...authHeader(accessToken),
      'Content-Type': 'application/json',
    },
    params: { ids: '' },
  }
  const trackIDs = result.map(track => track.id);
  let start = 0, end = 100;
  // Spotify's audio analysis API can process at most 100 tracks at a time,
  // so we process the tracks in 100-item batches
  while (start < trackIDs.length) {
    // concatenate 100 track ids into a comma-separated list
    config.params.ids = trackIDs.slice(start, end).join();
    const response = await axios.get('v1/audio-features', config);
    response.data.audio_features.forEach((feature, idx) => {
      const {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        speechiness,
        tempo,
        valence
      } = feature;
      result[start + idx].features = {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        speechiness,
        tempo,
        valence
      };
    });
    // process next batch of 100
    start = end;
    end += 100;
  }
  return result;
}