import {PictureContainer} from "../../atoms/IndexAtoms";
import React, {useRef, useState} from "react";

type Prop = {
    pictureURL: string;
};

const PictureContainerTemplate = ({pictureURL}: Prop) => {

    const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);
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

    return <>
        <PictureContainer
            pictureURL={pictureURL}
            imageHeight={containerSize ? `${containerSize.height}px` : '100%'}
            handleImageLoad={handleImageLoad}
        />
    </>
}

export default PictureContainerTemplate;