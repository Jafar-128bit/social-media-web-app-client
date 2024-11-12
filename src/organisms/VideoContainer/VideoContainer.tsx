import './videoContainer.css';

type Prop = {
    sources: {
        src: string;
        type: string;
    }[];
    poster?: string; // Optional poster image for the video
    controls?: boolean; // Option to show controls
}

const VideoContainer = ({ sources, poster, controls = false }: Prop) => {
    return <div className="videoContainer">
        <video
            controls={controls}
            poster={poster}
            width="100%"
            height="auto"
            disablePictureInPicture={true}
            loop={true}
            autoPlay={true}
            muted={true}
        >
            {sources.map((source, index) => (
                <source key={index} src={source.src} type={source.type} />
            ))}
            Your browser does not support the video tag.
        </video>
    </div>
}

export default VideoContainer;