import './commentContainer.css';
import {Button, ImageButton, ProfileImageContainer, PText} from "../../atoms/IndexAtoms";

import {ReplyText, TextPost} from "../IndexMolecules";
import {ButtonType, ImageButtonType} from "../../type/type";

type Prop = {
    likeButton: ImageButtonType;
    normalButtonData: ButtonType[];
    filteredProfileData: {
        username: string;
        profileImage: string | null;
    };
}

const CommentContainer = ({likeButton, normalButtonData, filteredProfileData}: Prop) => {
    return <div className='commentContainer'>
        <section className="commentContainer__section_1">
            <ProfileImageContainer
                styleName='commentProfileContainer'
                imageLink={filteredProfileData.profileImage}
            />
        </section>
        <section className="commentContainer__section_2">
            <section className="commentContainer__section_2_1">
                <ReplyText
                    profileName={filteredProfileData.username}
                    color="var(--colorBlack)"
                    text="Very nice picture I think you need to go for 📸 photography and 💓 designing #goPhotography #Love"
                    fontSize={14}
                    fontWeight={500}
                />
            </section>
            <section className="commentContainer__section_2_2">
                <PText
                    text="1 day ago"
                    fontSize={13}
                    fontWeight={500}
                    color="var(--colorGray3)"
                />
                <Button
                    handleCallback={normalButtonData[0].handleCallback}
                    buttonName={normalButtonData[0].buttonName}
                    buttonType={normalButtonData[0].buttonType}
                    buttonStyle={normalButtonData[0].buttonStyle}
                />
                <Button
                    handleCallback={normalButtonData[1].handleCallback}
                    buttonName={normalButtonData[1].buttonName}
                    buttonType={normalButtonData[1].buttonType}
                    buttonStyle={normalButtonData[1].buttonStyle}
                />
                <Button
                    handleCallback={normalButtonData[2].handleCallback}
                    buttonName={normalButtonData[2].buttonName}
                    buttonType={normalButtonData[2].buttonType}
                    buttonStyle={normalButtonData[2].buttonStyle}
                />
            </section>
        </section>
        <section className="commentContainer__section_3">
            <ImageButton
                handleCallback={likeButton.handleCallback}
                ButtonImage={likeButton.ButtonImage}
                isShowBadge={likeButton.isShowBadge}
            />
        </section>
    </div>
};

export default CommentContainer;
