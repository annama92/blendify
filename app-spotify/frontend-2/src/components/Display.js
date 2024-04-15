import React from "react";
import WFN from "./images/wfn.png";
import opera from "./images/opera.jpg";
import "./Display.css";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { SpotifyPlaylist } from 'react-spotify-tracks';

import { domainName } from "../utils/constants.js";

function Display() {
    const playlistName = 'Blendify - WFN';

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tracks, setTracks] = React.useState([]);

    let arrayURI = [];

    React.useEffect(() => {
        const getRecommendations = async () => {
            const init = {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            searchParams.set('seed_genres', 'pop');
            const url = `${domainName}/api/recommendations?${searchParams.toString()}`;
            try {
                const response = await fetch(url, init);
                console.log(response);
                // console.log(response.json().body);
                const trackList = await response.json();
                console.log(trackList);
                setTracks(trackList.tracks);
            } catch (err) {
                console.log("Error: Failed to fetch recommendations");
                console.log(err);
            }
        };
        getRecommendations();
    }, [searchParams, location]);

    function addPlaylist() {
        tracks.forEach(element => arrayURI.push(element.uri))
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": playlistName,
                "description": "Your custom playlist, curated by WFN's Projects Team <3",
                "uris": arrayURI
            })
        }

        fetch('http://localhost:8000/api/playlist', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            });
    }

    const textColor = '#ffffff';
    const subtextColor = '#909090';
    const tracksInfo = tracks.map((track, index) => ({
        title: track.name,
        imageUrl: track.album.images[0].url,
        albumName: track.album.name,
        artists: track.artists.map(artist => artist.name),
        index: index + 1,
        colors: {
            primary: textColor,
            secondary: subtextColor,
        }
    }));

    // use placeholder for playlist image if empty
    const playlistImg = tracks.length == 0 ? opera : tracks[0].album.images[0].url;

    return (<>
        <div className="container-display">
            <img src={WFN} className="wfn float-left" alt="WFN" />
            <div className="main-container">
                <img src={playlistImg} className="album-art float-left" alt="OPERA" />
                <div className="button-container">
                    <h1 className="text">{playlistName}</h1>
                    <button className="Add" onClick={addPlaylist}>ADD PLAYLIST</button>
                    <Link to="/" className="New">NEW PLAYLIST</Link>
                    <Link to="/attribute" className="Diff">NEW ATTRIBUTES</Link>
                </div>
            </div>
            <div className="playlist-container">
                <SpotifyPlaylist tracks={tracksInfo} headerColor={textColor} />
            </div>
        </div>
    </>)
}

export default Display;
