import './multiPictureContainer.css';

import {ImageButton, PictureContainer} from "../../atoms/IndexAtoms";

import React from "react";
import {SliderDotIndicator} from "../../molecules/IndexMolecules";
import {ImageButtonType} from "../../type/type";

type Prop = {
    imageDataLength: number;
    containerSize: { width: number; height: number } | null;
    counter: number;
    xTranslate: number;
    isImageHover: boolean;

    handleImageLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    handleJump: (index: number) => void;
    handleImageHover: (hoverFlag: boolean) => void;

    sliderButtonData: ImageButtonType[];
    imageData: string[];
}

const MultiPictureContainer = ({
                                   imageDataLength,
                                   containerSize,
                                   handleImageLoad,
                                   handleJump,
                                   xTranslate,
                                   counter,
                                   sliderButtonData,
                                   imageData,
                                   handleImageHover,
                                   isImageHover
                               }: Prop) => {
    return (
        <div
            className="multiPictureContainer"
            onMouseOver={() => handleImageHover(true)}
            onMouseLeave={() => handleImageHover(false)}
        >
            <section
                className={`multiPictureContainer__buttonContainer 
                ${isImageHover ? "showButtonContainer" : "hideButtonContainer"}`}
            >
                {sliderButtonData.map((button: ImageButtonType, index: number) => <ImageButton
                    key={index}
                    handleCallback={button.handleCallback}
                    ButtonImage={button.ButtonImage}
                    isShowBadge={button.isShowBadge}
                    imageButtonStyle={button.imageButtonStyle}
                />)}
            </section>
            {imageData.map((image, index) => (
                <PictureContainer
                    key={index}
                    pictureURL={image}
                    handleImageLoad={handleImageLoad}
                    imageHeight={containerSize ? `${containerSize.height}px` : '100%'}
                    xTranslateValue={xTranslate}
                />
            ))}
            <section className="multiPictureContainer__sliderIndicatorContainer">
                <SliderDotIndicator
                    numberOfPicture={imageDataLength}
                    dotIndication={counter}
                    dotAction={handleJump}
                />
            </section>
        </div>
    );
};

export default MultiPictureContainer;