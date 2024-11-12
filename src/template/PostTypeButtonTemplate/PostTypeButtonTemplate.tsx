import React, {useState} from 'react';
import {PostTypeButton} from "../../molecules/IndexMolecules";

type Prop = {
    handleCallback: () => void;
    optionName: string;
    isSelected: boolean;
}

const PostTypeButtonTemplate = ({handleCallback, optionName, isSelected}: Prop) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const handleOnMouseHover = (): void => {
        setIsHover(true);
    };
    const handleOnMouseLeave = (): void => {
        setIsHover(false);
    };

    return (
        <PostTypeButton
            handleCallback={handleCallback}
            buttonName={optionName}
            isHover={isHover}
            onMouseOver={handleOnMouseHover}
            onMouseLeave={handleOnMouseLeave}
            isSelected={isSelected}
        />
    );
};

export default PostTypeButtonTemplate;
