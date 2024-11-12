import {VideoContainer} from "../../organisms/indexOrganisms";
import React from "react";

const videoSources = [
    { src: 'https://example.com/video-720p.mp4', type: 'video/mp4' },
    // { src: 'https://example.com/video-480p.mp4', type: 'video/mp4' },
    // { src: 'https://example.com/video-360p.mp4', type: 'video/mp4' },
];

const VideoContainerTemplate = () => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const handleMuteUnmute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };
    const handleTimeUpdate = () => {
        if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
    };
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            videoRef.current.currentTime = parseFloat(event.target.value);
            setCurrentTime(videoRef.current.currentTime);
        }
    };
    const handleLoadedMetadata = () => {
        if (videoRef.current) setDuration(videoRef.current.duration);
    };

    return <>
        <VideoContainer sources={videoSources}/>
    </>
}

export default VideoContainerTemplate;