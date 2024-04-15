import React from 'react';
import './Button.css';

function Button() {

    const playlistArray = ["mood#1", "mood#2", "mood#3", "mood#4", "mood#5", "mood#6"];

    const handleClick = (playlistName) => {
        console.log(`Clicked button for ${playlistName}`);
    }

    return (
        <div className="container">
            <p className="title">choose the mood of your playlist</p>
            <div className="button-container">
                <button className="button" onClick={() => handleClick(playlistArray[0])}>
                    {playlistArray[0]}
                </button>
                <button className="button" onClick={() => handleClick(playlistArray[1])}>
                    {playlistArray[1]}
                </button>
                <button className="button" onClick={() => handleClick(playlistArray[2])}>
                    {playlistArray[2]}
                </button>
                <button className="button" onClick={() => handleClick(playlistArray[3])}>
                    {playlistArray[3]}
                </button>
                <button className="button" onClick={() => handleClick(playlistArray[4])}>
                    {playlistArray[4]}
                </button>
                <button className="button" onClick={() => handleClick(playlistArray[5])}>
                    {playlistArray[5]}
                </button>
            </div>
        </div>
    )
}

export default Button
