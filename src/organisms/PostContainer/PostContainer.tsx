import './postContainer.css';
import {Button, ImageButton, ProfileImageContainer, PText} from "../../atoms/IndexAtoms";
import {ButtonType, FilteredPostData, ImageButtonType, PostContentType} from "../../type/type";
import {ButtonContainer, TextPost} from "../../molecules/IndexMolecules";
import {
    MultiPictureContainerTemplate,
    PictureContainerTemplate,
} from "../../template/indexTemplate";

type Prop = {
    normalButtonMap: Record<string, ButtonType>;
    postMenuButton: ImageButtonType;
    postActionButton: ImageButtonType[];
    saveButton: ImageButtonType;
    postType: PostContentType;
    postData: FilteredPostData;
}

const PostContainer = ({
                           normalButtonMap,
                           postMenuButton,
                           postActionButton,
                           saveButton,
                           postType,
                           postData,
                       }: Prop) => {
    return <div className='postContainer'>
        <section className="postContainer__section_1">
            <section className="postContainer__section_1_1">
                <ProfileImageContainer styleName="profileImgPostContainer"
                                       imageLink={postData.profileData.profileImage}/>
                <section className="postContainer__section_1_1_1">
                    <PText
                        text={postData.profileData.username}
                        fontSize={16}
                        fontWeight={600}
                        color="var(--colorBlack)"
                    />
                    <PText
                        text={postData.timestamp}
                        fontSize={12}
                        fontWeight={500}
                        color="var(--colorGray5)"
                    />
                </section>
            </section>
            <section className="postContainer__section_1_2">
                <Button
                    handleCallback={normalButtonMap.followButton.handleCallback}
                    buttonName={normalButtonMap.followButton.buttonName}
                    buttonType={normalButtonMap.followButton.buttonType}
                    buttonStyle={normalButtonMap.followButton.buttonStyle}
                />
                <ImageButton
                    handleCallback={postMenuButton.handleCallback}
                    ButtonImage={postMenuButton.ButtonImage}
                    isShowBadge={postMenuButton.isShowBadge}
                    onMouseOver={postMenuButton.onMouseOver}
                    onMouseLeave={postMenuButton.onMouseLeave}
                    imageButtonStyle={postMenuButton.imageButtonStyle}
                />
            </section>
        </section>
        <section className="postContainer__section_2">
            {
                postType === "text" &&
                <TextPost
                    text={postData.content}
                    fontSize={18}
                    fontWeight={500}
                />
            }
            {postType === "image" && postData.attachments && (
                postData.attachments.length === 1 ? (
                    <PictureContainerTemplate pictureURL={postData.attachments[0].url}/>
                ) : (
                    <MultiPictureContainerTemplate pictureData={postData.attachments}/>
                )
            )}
        </section>
        <section className="postContainer__section_3">
            <section className="postContainer__section_3_1 postActionsButton">
                <ButtonContainer
                    buttonList={postActionButton}
                    buttonContainerStyle="postContainerButtonContainer"
                    buttonType="imageButtons"
                />
            </section>
            <section className="postContainer__section_3_1 postSaveButton">
                <ImageButton
                    handleCallback={saveButton.handleCallback}
                    ButtonImage={saveButton.ButtonImage}
                    isShowBadge={saveButton.isShowBadge}
                    onMouseOver={saveButton.onMouseOver}
                    onMouseLeave={saveButton.onMouseLeave}
                    imageButtonStyle={saveButton.imageButtonStyle}
                />
            </section>
        </section>
        <section
            className={`postContainer__section_4 ${(postType === "image" || postType === "video") ? "mediaStyle" : "textStyle"}`}>
            <Button
                handleCallback={normalButtonMap.likeCountButton.handleCallback}
                buttonName={normalButtonMap.likeCountButton.buttonName}
                buttonType={normalButtonMap.likeCountButton.buttonType}
                buttonStyle={normalButtonMap.likeCountButton.buttonStyle}
            />
            {(postType === "image" || postType === "video") && <TextPost
                text={postData.content}
                fontSize={14}
                fontWeight={500}
            />}
            <Button
                handleCallback={normalButtonMap.viewAllButton.handleCallback}
                buttonName={normalButtonMap.viewAllButton.buttonName}
                buttonType={normalButtonMap.viewAllButton.buttonType}
                buttonStyle={normalButtonMap.viewAllButton.buttonStyle}
            />
        </section>
    </div>
};

export default PostContainer;
