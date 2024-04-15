import React from 'react';
import './Slider.css';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';


function SliderButton() {
    const CustomSlider = styled(Slider)({
        color: '#ffffff',
        height: 8,
        '& .MuiSlider-track': {
            border: '3px solid #E18484',
        },
        '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#E18484',
            border: '2px solid #fff',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&:before': {
                display: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1.2,
            fontSize: 12,
            background: 'unset',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: '#E18484',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&:before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
    });

    const attributeArray = ['attribute#1', 'attribute#2', 'attribute#3', 'attribute#4'];

    const handleChange = (attributeName) => {
        console.log(`Changed slider for ${attributeName}`);
    }

    return (

        <div className="container">
            <p className="title">make your perfect playlist</p>
            <div className="slider-container">
                <div className="slider">
                    <p className="attributeName">{attributeArray[0]}</p>
                    < CustomSlider
                        defaultValue={50}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                        onChange={() => handleChange(attributeArray[0])}
                    />
                </div>
                <div className="slider">
                    <p className="attributeName">{attributeArray[1]}</p>
                    < CustomSlider
                        defaultValue={50}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                        onChange={() => handleChange(attributeArray[1])}
                    />
                </div>
                <div className="slider">
                    <p className="attributeName">{attributeArray[2]}</p>
                    < CustomSlider
                        defaultValue={50}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                        onChange={() => handleChange(attributeArray[2])}
                    />
                </div>
                <div className="slider">
                    <p className="attributeName">{attributeArray[3]}</p>
                    < CustomSlider
                        defaultValue={50}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                        onChange={() => handleChange(attributeArray[3])}
                    />
                </div>
            </div>
            <button className="button">let's go!</button>
        </div>
    )
}

export default SliderButton
