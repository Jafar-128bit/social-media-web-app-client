import {AddCommentManu} from "../../organisms/indexOrganisms";
import React, {useEffect, useRef, useState} from "react";

import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';

const AddCommentTemplate = () => {
    const addCommentIconStyle = {
        color: "var(--colorBlack)",
        fontSize: "28px",
    };

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [commentText, setCommentText] = useState<string>("");

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [commentText]);

    const stopPropagation = (e: React.MouseEvent): void => {
        e.stopPropagation();
    };
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        e.preventDefault();
        setCommentText(e.target.value);
    };
    const handleAddComment = () => {
        /* TODO: Add comment logic which will two logic in here first will be an API call and other static */
    };

    return <>
        <AddCommentManu
            stopPropagation={stopPropagation}
            textareaValue={commentText}
            handleChange={handleTextAreaChange}
            textAreaRef={textAreaRef}
            addCommentButtonImage={<NearMeRoundedIcon style={addCommentIconStyle}/>}
            handleAddComment={handleAddComment}
        />
    </>
};

export default AddCommentTemplate;
