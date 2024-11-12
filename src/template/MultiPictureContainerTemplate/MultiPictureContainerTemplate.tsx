import {MultiPictureContainer} from "../../organisms/indexOrganisms";

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

import React, {useCallback, useEffect, useRef, useState} from "react";
import {AttachmentType, ImageButtonType} from "../../type/type";

const iconStyle = {
    color: "var(--colorBlack)",
    fontSize: "24px"
}

type Prop = {
    pictureData: AttachmentType[];
}

const MultiPictureContainerTemplate = ({pictureData}: Prop) => {
    const imageData: string[] = pictureData.map(picture => picture.url);
    const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);
    const [counter, setCounter] = useState<number>(0);
    const [xTranslate, setXTranslate] = useState<number>(0);
    const [buttonVisibility, setButtonVisibility] = useState<{ prev: boolean; next: boolean }>({
        prev: false,
        next: true
    });
    const [isImageHover, setIsImageHover] = useState<boolean>(false);
    const hasLoadedOnce = useRef(false);
    const fixedWidth = 500;

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (!hasLoadedOnce.current) {
            const {naturalWidth, naturalHeight} = event.currentTarget;
            const calculatedHeight = Math.ceil(Math.max(300, Math.min((naturalHeight / naturalWidth) * fixedWidth, 700)));
            setContainerSize({width: fixedWidth, height: calculatedHeight});
            hasLoadedOnce.current = true;
        }
    };
    const handleTranslate = useCallback((index: number) => {
        const newWidth = fixedWidth * index;
        setXTranslate(newWidth);
    }, []);
    const handleButtonVisibility = useCallback((index: number): void => {
        setButtonVisibility({
            prev: index > 0,
            next: index < imageData.length - 1
        });
    }, [imageData.length]);
    const handleNext = (): void => {
        if (counter < imageData.length - 1) {
            const newIndex = counter + 1;
            setCounter(newIndex);
            handleTranslate(newIndex);
        }
    };
    const handlePrev = (): void => {
        if (counter > 0) {
            const newIndex = counter - 1;
            setCounter(newIndex);
            handleTranslate(newIndex);
        }
    };
    const handleJump = (index: number): void => {
        if (index >= 0 && index <= imageData.length - 1) {
            setCounter(index);
            handleTranslate(index);
        }
    };
    const handleImageHover = (hoverFlag: boolean): void => {
        setIsImageHover(hoverFlag);
    };
    useEffect(() => {
        handleButtonVisibility(counter);
    }, [counter, handleButtonVisibility]);

    const sliderButtonData: ImageButtonType[] = [
        {
            handleCallback: handlePrev,
            ButtonImage: <KeyboardArrowLeftRoundedIcon style={iconStyle}/>,
            isShowBadge: false,
            imageButtonStyle: `imageSliderButtons ${!buttonVisibility.prev ? "disableImageButton" : ""}`,
        },
        {
            handleCallback: handleNext,
            ButtonImage: <KeyboardArrowRightRoundedIcon style={iconStyle}/>,
            isShowBadge: false,
            imageButtonStyle: `imageSliderButtons ${!buttonVisibility.next ? "disableImageButton" : ""}`,
        },
    ];

    return <>
        <MultiPictureContainer
            containerSize={containerSize}
            counter={counter}
            handleJump={handleJump}
            imageData={imageData}
            imageDataLength={imageData.length}
            sliderButtonData={sliderButtonData}
            handleImageLoad={handleImageLoad}
            xTranslate={xTranslate}
            handleImageHover={handleImageHover}
            isImageHover={isImageHover}
        />
    </>
}

export default MultiPictureContainerTemplate;