import axios from 'axios';

import { spotifyDefaultConfig } from '../../utils/constants.js';
import handleResponseError from '../../utils/handleResponseError.js';

/**
 * Placeholder route for testing that authentication works.
 * Sends a response with "Hello, <name>!"
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export default async function hello(req, res) {
  try {
    // config for the GET v1/me request
    const accessToken = req.session?.authToken?.accessToken;
    const config = spotifyDefaultConfig(accessToken);
    // make the request
    const response = await axios.get('v1/me', config);
    // send the received data to the user
    res.send(`Hello, ${response.data.display_name}!`);
  } catch (err) {
    // an error occured in the request
    handleResponseError(res, err);
  }
}