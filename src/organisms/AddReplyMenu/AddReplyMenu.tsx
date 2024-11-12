import './addReplyMenu.css';
import {ImageButton, ProfileImageContainer, Textarea} from "../../atoms/IndexAtoms";
import React, {LegacyRef} from "react";

type Prop = {
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    textareaValue: string;
    textAreaRef: LegacyRef<HTMLTextAreaElement> | null;
    addReplyButtonImage: React.ReactElement;
    handleAddReply: () => void;
}

const AddReplyMenu = ({handleAddReply, addReplyButtonImage, handleChange, textAreaRef, textareaValue}: Prop) => {
    return <div className="addReplyMenu">
        <section className="addReplyMenu__section1">
            <ProfileImageContainer styleName="addReplyProfilePicture"/>
        </section>
        <section className="addReplyMenu__section2">
            <Textarea
                name="textareaAddCommentMenu"
                placeholder="Reply to @username ..."
                value={textareaValue}
                handleChange={handleChange}
                styleName="textareaAddCommentMenu"
                textAreaRef={textAreaRef}
            />
        </section>
        <section className="addReplyMenu__section3">
            <ImageButton
                handleCallback={() => {}}
                ButtonImage={addReplyButtonImage}
                isShowBadge={false}
                imageButtonStyle="addCommentButton"
            />
        </section>
    </div>
}

export default AddReplyMenu;