/**
 * Constants used for the authentication + authentication redirect routes
 */

// identifier for this application provided by the Spotify API
export const clientId = process.env.CLIENT_ID;
// secret key to authorize Spotify API calls provided by Spotify API
export const clientSecret = process.env.CLIENT_SECRET;
// domain name of the server running the application
export const domainName = process.env.DOMAIN_NAME;
// port that the server of the application is running on
export const port = process.env.PORT;
// URI where the application is redirected after requesting authorization
export const authRedirect = `${domainName}/auth/token`;
// key used for the cookie storing the OAuth state used for response verification
export const authStateKey = 'spotify_oauth_state';
// Spotify API base url
export const spotifyBaseUrl = 'https://api.spotify.com';
// The header to be included for authorization
export const authHeader = (accessToken) => ({ 'Authorization': `Bearer ${accessToken}`});
// A default HTTP request config to be sent with a Spotify API request
export const spotifyDefaultConfig = (accessToken) => ({
  baseURL: spotifyBaseUrl,
  headers: {
    ...authHeader(accessToken),
    'Content-Type': 'application/json',
  }
});
