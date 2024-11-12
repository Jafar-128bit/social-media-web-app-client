import './addPostTemplate.css'
import {AddPostMenu} from "../../organisms/indexOrganisms";
import {ImageButtonType} from "../../type/type";

import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import GifBoxIcon from '@mui/icons-material/GifBox';
import React, {useMemo} from "react";
import useHoverData from "../../hooks/useHover";

const iconStyleAddPostMenu = {
    fontSize: '24px',
    transition: "color 0.15s ease-in-out"
};

const AddPostTemplate = () => {
    const buttonCount: number = 3;
    const {hoverData, handleHover, getButtonColor} = useHoverData(buttonCount)

    const stopPropagation = (e: React.MouseEvent): void => {
        e.stopPropagation();
    };

    const buttonData: ImageButtonType[] = useMemo((): ImageButtonType[] => [
        {
            handleCallback: () => {
            },
            ButtonImage: <PhotoLibraryIcon
                style={{
                    ...iconStyleAddPostMenu,
                    color: getButtonColor([
                        {
                            check: hoverData.button1,
                            baseColor: 'var(--colorGray6)',
                            transitionColor: 'var(--colorGray2)'
                        }
                    ]),
                }}/>,
            isShowBadge: false,
            imageButtonStyle: "addPostMenuButton",
            onMouseLeave: () => handleHover('button1', false),
            onMouseOver: () => handleHover('button1', true),
        },
        {
            handleCallback: () => {
            },
            ButtonImage: <VideoFileIcon style={{
                ...iconStyleAddPostMenu,
                color: getButtonColor([
                    {
                        check: hoverData.button2,
                        baseColor: 'var(--colorGray6)',
                        transitionColor: 'var(--colorGray2)'
                    }
                ]),
            }}/>,
            isShowBadge: false,
            imageButtonStyle: "addPostMenuButton",
            onMouseLeave: () => handleHover('button2', false),
            onMouseOver: () => handleHover('button2', true),
        },
        {
            handleCallback: () => {
            },
            ButtonImage: <GifBoxIcon style={{
                ...iconStyleAddPostMenu,
                color: getButtonColor([
                    {
                        check: hoverData.button3,
                        baseColor: 'var(--colorGray6)',
                        transitionColor: 'var(--colorGray2)'
                    }
                ]),
            }}/>,
            isShowBadge: false,
            imageButtonStyle: "addPostMenuButton",
            onMouseLeave: () => handleHover('button3', false),
            onMouseOver: () => handleHover('button3', true),
        },
    ], [hoverData]);

    return <div className="addPostTemplate" onClick={stopPropagation}>
        <AddPostMenu buttonData={buttonData}/>
    </div>
}

export default AddPostTemplate;