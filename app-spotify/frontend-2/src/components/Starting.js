import React from "react";
import "./Starting.css";
import { Link } from "react-router-dom";

function Example() {


    return (
        <div className="container">
            {/* <div class="CircleMedium"></div>
      <div class="CircleSmall"></div>
      <div class="CircleBig"></div> */}

            <p className="Title">Blendify</p>
            <p className="Subtitle">new playlists based on your liked songs</p>
            <a href="http://localhost:8000/auth/code" className="StartButton">Start</a>
        </div>
    );
}

export default Example;
