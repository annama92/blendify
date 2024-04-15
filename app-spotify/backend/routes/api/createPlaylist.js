import axios from 'axios';
import express from 'express';

import { spotifyDefaultConfig } from '../../utils/constants.js';
import handleResponseError from '../../utils/handleResponseError.js';

/**
 * Create a new playlist for the currently authenticated user with a specified
 * name, description, and list of Spotify URIs.
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export default async function createPlaylist(req, res) {
  const { accessToken } = req.session?.authToken;
  const config = spotifyDefaultConfig(accessToken);
  
  // parse body parameters
  const { name, description, uris } = req.body;
  // name is required
  if (!name) {
    res.status(400).send('BAD request: `name` parameter is required');
  } else {
    try {
      // get the user ID
      const idResponse = await axios.get('v1/me', config);
      const userId = idResponse.data.id;
      // create an empty playlist with the specified name and description
      const createResponse = await axios.post(
        `v1/users/${userId}/playlists`,
        { name, description },
        config
      );
      const newPlaylist = createResponse.data;
      // get the playlist ID of the newly created playlist
      const playlistId = newPlaylist.id;
      // add the tracks (by URIs) to the newly created playlist
      const addResponse = await axios.post(
        `v1/playlists/${playlistId}/tracks`,
        { uris },
        config
      );
      // adding tracks to a playlist updates the `snapshot_id` of the playlist,
      // we update it accordingly before returning the new playlist object
      newPlaylist.snapshot_id = addResponse.data.snapshot_id;
      console.log(`Created new playlist '${name}'`);
      res.send(newPlaylist);
    } catch (err) {
      handleResponseError(res, err);
    }
  }
}