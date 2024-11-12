import {AddReplyMenu} from "../../organisms/indexOrganisms";

import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import React, {useEffect, useRef, useState} from "react";

type Prop = {
    isReplyMenuShow: boolean;
}

const AddReplyTemplate = ({isReplyMenuShow}: Prop) => {
    const addCommentIconStyle = {
        color: "var(--colorBlack)",
        fontSize: "28px",
    };
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [replyText, setReplyText] = useState<string>("");

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [replyText]);

    const handleAddReply = () => {

    };
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        e.preventDefault();
        setReplyText(e.target.value);
    };

    return <>
        {
            isReplyMenuShow &&
            <AddReplyMenu
                handleChange={handleTextAreaChange}
                addReplyButtonImage={<NearMeRoundedIcon style={addCommentIconStyle}/>}
                handleAddReply={() => {}}
                textAreaRef={textAreaRef}
                textareaValue={replyText}
            />
        }
    </>
}

export default AddReplyTemplate;