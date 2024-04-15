# Spotify Playlist Mixer

## Build

1. Clone the repository with `git clone https://github.com/WFN-Projects/app-spotify`.

1. Install dependencies by running `npm install` in the root directory and in the `frontend/` directory.

1. Configure the following environnment variables in a `.env` file in the root directory:
    ```
    DOMAIN_NAME = <domain name of the running server>
    PORT = <listening port>
    CLIENT_ID = <client ID for this application>
    CLIENT_SECRET = <secret key for this application>
    SESSION_SECRET = <salt for the express-session session hash>
    ```
    The `CLIENT_ID` and `CLIENT_SECRET` are on the [Spotify Dashboard](https://developer.spotify.com/dashboard).

    `SESSION_SECRET` can be any random string (20-32 alphanumeric characters suffice).

1.  Run `npm start` to run the application on `DOMAIN_NAME:PORT`.
