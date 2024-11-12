import './addCommentManu.css';
import {ImageButton, ProfileImageContainer, Textarea} from "../../atoms/IndexAtoms";
import React, {LegacyRef} from "react";

type Prop = {
    stopPropagation: (e: React.MouseEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    textareaValue: string;
    textAreaRef: LegacyRef<HTMLTextAreaElement> | null;
    addCommentButtonImage: React.ReactElement;
    handleAddComment: () => void;
}

const AddCommentManu = ({
                            stopPropagation,
                            textareaValue,
                            handleChange,
                            textAreaRef,
                            addCommentButtonImage,
                            handleAddComment
                        }: Prop) => {

    const addCommentIconStyle = {
        color: "var(--colorBlack)",
        fontSize: "28px",
    };

    return <div className='addCommentManu' onClick={stopPropagation}>
        <section className="addCommentManu__section1">
            <ProfileImageContainer styleName="profileAddCommentMenu"/>
        </section>
        <section className="addCommentManu__section2">
            <Textarea
                name="textareaAddCommentMenu"
                placeholder="Comment it..."
                value={textareaValue}
                handleChange={handleChange}
                styleName="textareaAddReplyMenu"
                textAreaRef={textAreaRef}
            />
        </section>
        <section className="addCommentManu__section3">
            <ImageButton
                handleCallback={() => {
                }}
                ButtonImage={addCommentButtonImage}
                isShowBadge={false}
                imageButtonStyle="addCommentButton"
            />
        </section>
    </div>
};

export default AddCommentManu;
