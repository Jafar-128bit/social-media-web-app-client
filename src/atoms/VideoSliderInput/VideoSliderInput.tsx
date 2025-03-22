import './videoSliderInput.css';
import React from "react";

type Prop = {
    duration: number;
    currentTime: number;
    handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoSliderInput = ({duration, handleSliderChange, currentTime}: Prop) => {
    return <input
        type="range"
        className="videoSliderInput"
        min="0"
        max={duration}
        step="0.1"
        value={currentTime}
        onChange={handleSliderChange}
    />
};

export default VideoSliderInput;