import './videoContainer.css';
import {ImageButton, VideoSliderInput} from "../../atoms/IndexAtoms";
import {ImageButtonType, VideoSources} from "../../type/type";
import React, {LegacyRef} from "react";

type Prop = {
    videoRef: LegacyRef<HTMLVideoElement> | undefined;
    sources: VideoSources;
    currentTime: number;
    duration: number;
    handleFunctions: {
        handleTimeUpdate: () => void;
        handleLoadedMetadata: () => void;
        handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleHover: (hoverFlag: boolean) => void;
    };
    videoImageIconButtonData: ImageButtonType[];
    poster?: string;
    controls?: boolean;
}

const VideoContainer = ({
                            videoRef,
                            sources,
                            poster,
                            controls = false,
                            handleFunctions,
                            duration,
                            currentTime,
                            videoImageIconButtonData
                        }: Prop) => {
    return <div
        className="videoContainer"
        onMouseOver={() => handleFunctions.handleHover(true)}
        onMouseLeave={() => handleFunctions.handleHover(false)}
    >
        <video
            ref={videoRef}
            controls={controls}
            poster={poster}
            width="100%"
            height="auto"
            disablePictureInPicture={true}
            loop={true}
            autoPlay={true}
            muted={true}
            onTimeUpdate={handleFunctions.handleTimeUpdate}
            onLoadedMetadata={handleFunctions.handleLoadedMetadata}
        >
            <source src={sources.src} type={sources.type}/>
            Your browser does not support the video tag.
        </video>
        {videoImageIconButtonData.map((button: ImageButtonType, index: number) => <ImageButton
            key={index}
            handleCallback={button.handleCallback}
            ButtonImage={button.ButtonImage}
            isShowBadge={button.isShowBadge}
            imageButtonStyle={button.imageButtonStyle}
        />)}
        <VideoSliderInput
            duration={duration}
            currentTime={currentTime}
            handleSliderChange={handleFunctions.handleSliderChange}
        />
    </div>
}

export default VideoContainer;