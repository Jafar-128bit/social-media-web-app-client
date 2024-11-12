import './pictureContainer.css';
import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';
import React from "react";
import {motion} from 'framer-motion';

type Prop = {
    pictureURL: string;
    imageHeight: string;
    handleImageLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    xTranslateValue?: number;
};

const PictureContainer = ({pictureURL, handleImageLoad, imageHeight, xTranslateValue}: Prop) => {
    return (
        <motion.div
            className="pictureContainer"
            style={{
                width: '500px',
                height: imageHeight,
            }}
            initial={{x: 0}}
            animate={{x: xTranslateValue ? -xTranslateValue : 0}}
            transition={{ease: "easeOut", duration: 0.25}}
        >
            <img
                src={pictureURL || defaultProfilePicture}
                alt="profile"
                onLoad={handleImageLoad}
            />
        </motion.div>
    );
}

export default PictureContainer;

/*

style={{width: '500px', height: containerSize ? `${containerSize.height}px` : 'auto',}}
* */