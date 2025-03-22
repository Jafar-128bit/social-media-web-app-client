import {VideoContainer} from "../../organisms/indexOrganisms";
import React, {useEffect, useRef, useState} from "react";

import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

import {AttachmentType, ImageButtonType, VideoSources} from "../../type/type";

const iconStyle = {
    color: "var(--colorWhite)",
    fontSize: "24px",
}

type Prop = {
    videoData: AttachmentType[];
};

const VideoContainerTemplate = ({videoData}: Prop) => {
    const videoSources: VideoSources = {
        src: videoData[0].url,
        type: "video/mp4"
    };

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const handleHover = (hoverFlag: boolean): void => {
        setIsHover(hoverFlag);
    }
    const handlePlayPause = (): void => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };
    const handleMuteUnmute = (): void => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };
    const handleTimeUpdate = (): void => {
        if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
    };
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (videoRef.current) {
            videoRef.current.currentTime = parseFloat(event.target.value);
            setCurrentTime(videoRef.current.currentTime);
        }
    };
    const handleLoadedMetadata = (): void => {
        if (videoRef.current) setDuration(videoRef.current.duration);
    };

    const videoImageIconButtonData: ImageButtonType[] = [
        {
            handleCallback: handlePlayPause,
            ButtonImage: !isPlaying
                ? <PlayArrowRoundedIcon style={iconStyle}/>
                : <PauseRoundedIcon style={iconStyle}/>,
            isShowBadge: false,
            imageButtonStyle: isHover ? "videoPlayPauseButton" : "videoPlayPauseButton disableImageButton",
        },
        {
            handleCallback: handleMuteUnmute,
            ButtonImage: !isMuted
                ? <VolumeOffRoundedIcon style={iconStyle}/>
                : <VolumeUpRoundedIcon style={iconStyle}/>,
            isShowBadge: false,
            imageButtonStyle: isHover ? "videoMuteUnmuteButton" : "videoMuteUnmuteButton disableImageButton",
        },
    ];

    return <>
        <VideoContainer
            videoImageIconButtonData={videoImageIconButtonData}
            videoRef={videoRef}
            sources={videoSources}
            handleFunctions={{
                handleSliderChange: handleSliderChange,
                handleLoadedMetadata: handleLoadedMetadata,
                handleTimeUpdate: handleTimeUpdate,
                handleHover,
            }}
            currentTime={currentTime}
            duration={duration}
        />
    </>
}

export default VideoContainerTemplate;