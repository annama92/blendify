// Express app initiailization (routes, middleware, etc.)

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authCode } from "./routes/auth/code.js";
import { requestAuthToken } from "./routes/auth/token.js";
import checkAuth from "./routes/auth/checkAuth.js";
import hello from "./routes/api/hello.js";
import getTracks from "./routes/api/getTracks.js";
import getRecommendations from "./routes/api/recommendations/getRecommendations.js";
import getGenreSeeds from "./routes/api/recommendations/getGenreSeeds.js";
import createPlaylist from "./routes/api/createPlaylist.js";
import errorHandledJson from "./routes/errorHandledJson.js";

const app = express();


/**
 * Set middleware
 */

// session options with which to initialize express-session
const sessionOptions = {
  // secret key to sign the session ID cookie
  secret: process.env.SESSION_SECRET,
  // disable forced session resaves, even if the request did not modify the session
  // (true is deprecated)
  resave: false,
  // disable forcing an uninitialized session to be saved
  // (true is deprecated)
  saveUninitialized: false,
  cookie: {},
};

// enable secure cookies if this is a production build
if (app.get("env") === "production") {
  sessionOptions.cookie.secure = true;
}

// initialize middle-ware
app.use(cors({ origin: true, credentials: true }));
app.use(session(sessionOptions));
app.use(cookieParser());
app.use("/api", checkAuth); // require auth for all API endpoints
app.use(errorHandledJson); // parse request bodies as JSON and store in req.body

// Set the static asset directory
// TODO: Uncomment following line to use front-end. For now, we use a placeholder
// app.use(express.static(path.resolve('./') + '/frontend/public'));

/**
 * Initialize routes
 */
// root route
app.get("/", (req, res) => {
  /// TODO: Uncomment following line to use front-end. For now, we use a placeholder
  // res.sendFile(path.resolve('./') + '/build/front/index.html');
  res.send("Hello, world!");
});
// authentication route to receive the authentication code
app.get("/auth/code", authCode);
// authentication route to receive the auth token
app.get("/auth/token", requestAuthToken);
// API routes
app.all("/api/hello", hello);
app.get("/api/tracks", getTracks);
app.get("/api/recommendations", getRecommendations);
app.get("/api/recommendations/genre-seeds", getGenreSeeds);
app.post("/api/playlist", createPlaylist);
export default app;
