import React, { useState } from "react";
import "./SliderButton.css";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

function SliderButton() {
  const CustomSlider = styled(Slider)({
    color: "#ffffff",
    height: 8,
    "& .MuiSlider-track": {
      border: "3px solid #E18484",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#E18484",
      border: "2px solid #fff",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#E18484",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  const navigate = useNavigate();

  const [attrValue, setAttrValue] = useState([0.5, 0.5, 0.5, 50]);

  const attributeArray = [
    "danceability",
    "happiness",
    "acousticness",
    "popularity",
  ];

  const handleChange = (indexVal, val) => {
    setAttrValue((oldAttrValue) => {
      oldAttrValue[indexVal] = val;
      return oldAttrValue;
    });
    console.log(
      `Changed slider for ${attributeArray[indexVal]} to equal ${val}`
    );
    console.log(attrValue);
  };

  const goToPlaylist = () => {
    // get the length of the shorter of the two, just in case they are mismatched
    const numAttributes = Math.min(attributeArray.length, attrValue.length);
    const paramsObj = {};
    for (let i = 0; i < numAttributes; ++i) {
      // build query params from attributes and values
      const attrName = attributeArray[i];
      const attrVal = attrValue[i];
      paramsObj[attrName] = attrVal;
    }
    const params = new URLSearchParams(paramsObj);
    const playlistURL = `/results?${params.toString()}`;
    navigate(playlistURL);
  }

  return (
    <div className="slider-main-container">
      <p className="title">make your perfect playlist</p>
      <div className="slider-container">
        <div className="slider">
          <p className="attributeName">{attributeArray[0]}</p>
          <CustomSlider
            defaultValue={attrValue[0]}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={1}
            onChangeCommitted={(event, value) => handleChange(0, value)}
          />
        </div>
        <div className="slider">
          <p className="attributeName">{attributeArray[1]}</p>
          <CustomSlider
            defaultValue={attrValue[1]}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={1}
            onChangeCommitted={(event, value) => handleChange(1, value)}
          />
        </div>
        <div className="slider">
          <p className="attributeName">{attributeArray[2]}</p>
          <CustomSlider
            defaultValue={attrValue[2]}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={1}
            onChangeCommitted={(event, value) => handleChange(2, value)}
          />
        </div>
        <div className="slider">
          <p className="attributeName">{attributeArray[3]}</p>
          <CustomSlider
            defaultValue={attrValue[3]}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={100}
            onChangeCommitted={(event, value) => handleChange(3, value)}
          />
        </div>
      </div>
      <button onClick={goToPlaylist} className="button">
        let's go!
      </button>
    </div>
  );
}

export default SliderButton;
