import './addPostMenu.css';

/* Default Assets Import */
import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';

/* Icon Imports */
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import PostTextEditor from "../PostTextEditor/PostTextEditor";

import React, {ChangeEvent, useMemo, useRef, useState} from "react";
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {EditorState, Modifier, SelectionState} from "draft-js";

import {Attachment, GifFileType, PostType, ProfileDataType} from "../../type/type";
import {
    addAttachment,
    clearAllAttachments,
    removeAttachment,
    updatePostComment
} from '../../store/slices/attachmentsSlice';
import {togglePopUp} from "../../store/slices/popUpSlices";
import {removeGifAttachmentType} from "../../store/slices/gifAttachmentSlice";
import {readFileAsDataURL} from "../../utils/utils";
import MentionWordList from "../MentionWordList/MentionWordList";
import HashtagWordList from "../HashtagWordList/HashtagWordList";
import {profileData} from "../../data/data";
import usePopState from "../../hooks/usePopUpState";
import Post from "../Post/Post";
import {addPost, addRepost, editPostData} from "../../store/slices/postDataSlices";

// const plainText: string[] = [];
// const hashtags: string[] = [];
// const mentions: string[] = [];
//
// for (const word of words) {
//     if (word.startsWith("#")) {
//         hashtags.push(word.slice(1)); // Remove the '#' character
//     } else if (word.startsWith("@")) {
//         mentions.push(word.slice(1)); // Remove the '@' character
//     } else {
//         plainText.push(word);
//     }
// }
//
//
// console.log(content);
// console.log("Plain Text:", plainText);
// console.log("Hashtags:", hashtags);
// console.log("Mentions:", mentions);

const AddPostMenu = ({addType}: { addType: "newPost" | "newComment" | "newRepost" }) => {
    const dispatch = useDispatch();
    const location = useLocation().pathname.split("/")[1];
    const popMenuState = usePopState();

    const addCommentMenu = popMenuState.find(popUp => popUp.actionName === "addCommentMenu");
    const addRepostMenu = popMenuState.find(popUp => popUp.actionName === "addRepostMenu");

    const loggedInProfileInfo = useSelector((state: any) => state.profileInfoSlice.profileInfo);
    const postList: PostType[] = useSelector((state: any) => state.postDataSlices);

    const profile: ProfileDataType | undefined = useMemo(() => profileData
            .find(profile => profile.profileId === loggedInProfileInfo.profileId),
        [loggedInProfileInfo]);

    const replyProfile: ProfileDataType | undefined = useMemo(() => addCommentMenu?.actionArgument
            ? profileData.find(profile => profile.profileId === addCommentMenu?.actionState.profileId)
            : addRepostMenu?.actionArgument
                ? profileData.find(profile => profile.profileId === addRepostMenu?.actionState.profileId)
                : undefined,
        [addCommentMenu]);

    const currentPostData: PostType | undefined = useMemo(() => addCommentMenu?.actionArgument
            ? postList.find(post => post.postId === addCommentMenu?.actionState.postId)
            : addRepostMenu?.actionArgument
                ? postList.find(post => post.postId === addRepostMenu?.actionState.originalPostId)
                : undefined,
        [addCommentMenu]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const attachmentUrls = useSelector((state: any) => state.attachmentsSlice);
    const gifAttachmentData = useSelector((state: any) => state.gifAttachmentSlice);
    const [showHashtagList, setShowHashtagList] = useState<boolean>(false);
    const [showMentionList, setShowMentionList] = useState<boolean>(false);
    const [searchWord, setSearchWord] = useState<string>('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const handleSetContent = (content: string): void => {
        dispatch(updatePostComment(content));
    };
    const handleChangeSearchWord = (searchTerm: string): void => {
        setSearchWord(searchTerm);
    };
    const handleSetEditorState = (editorState: EditorState): void => {
        setEditorState(editorState);
    };
    const handleShowSpecialWordList = (wordType: "hashtag" | "mention", isShow: boolean): void => {
        if (wordType === "hashtag") setShowHashtagList(isShow);
        if (wordType === "mention") setShowMentionList(isShow);
    };
    const handleSelectSuggestion = (suggestion: string, wordType: "hashtag" | "mention"): void => {
        const currentContentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const currentSelectionRange = selection.getAnchorOffset();
        const currentText = currentContentState.getPlainText();

        let startIndex = currentSelectionRange - 1;
        let findChar = '';

        if (wordType === "mention") {
            findChar = '@';
        } else if (wordType === "hashtag") {
            findChar = '#';
        }

        while (startIndex >= 0 && currentText[startIndex] !== findChar) {
            startIndex--;
        }
        startIndex++;

        const newContentState = Modifier.replaceText(
            currentContentState,
            SelectionState.createEmpty(editorState.getCurrentContent().getLastBlock().getKey())
                .merge({
                    anchorOffset: startIndex,
                    focusOffset: selection.getAnchorOffset(),
                    isBackward: false,
                }),
            `${suggestion}`,
        );

        const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
        setEditorState(newEditorState);
    };
    const handleButtonClick = (): void => {
        if (fileInputRef.current) fileInputRef.current.click();
    };
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const files = Array.from(event.target.files);
        const existingFileCount = Object.keys(attachmentUrls.files).length;

        const handleStoreFile = async (file: File, key: string) => {
            const fileType = file.type;
            const fileUrl = await readFileAsDataURL(file);

            if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
                dispatch(addAttachment({fileId: key, src: fileUrl, alt: ''}));
            } else {
                console.warn(`Unsupported file type: ${fileType}`);
            }
        };

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const key = `${existingFileCount + i}`;
            await handleStoreFile(file, key);
        }
    };
    const handleRemoveFile = (fileId: string) => dispatch(removeAttachment(fileId));
    const handleOpenAddGifMenu = (): void => {
        if (location !== "create") {
            dispatch(togglePopUp({actionName: "addCommentMenu", actionArgument: false}));
        } else dispatch(togglePopUp({actionName: "addNewPostMenu", actionArgument: false}));
        dispatch(togglePopUp({actionName: "addGif", actionArgument: true}));
    };
    const handlePost = (): void => {
        const handleError = (message: string): void => {
            console.error(message);
            throw new Error(message);
        };
        const finalizePostActions = (popUpMenuName: "addCommentMenu" | "addRepostMenu" | "addNewPostMenu"): void => {
            dispatch(togglePopUp({actionName: "popMenuContainer", actionArgument: false}));
            dispatch(clearAllAttachments());
            dispatch(togglePopUp({actionName: popUpMenuName, actionArgument: false}));
        };

        if (addCommentMenu?.actionArgument) {
            if (currentPostData?.postId && profile) {
                dispatch(editPostData({
                    postId: currentPostData.postId,
                    editOption: "addComment",
                    profileId: profile.profileId,
                    commentContent: attachmentUrls.postComment,
                }));
                finalizePostActions("addCommentMenu");
            } else handleError("Cannot Find Post Data or Profile Data!");
        } else if (addRepostMenu?.actionArgument) {
            if (currentPostData?.postId && profile) {
                dispatch(addRepost({
                    profileId: loggedInProfileInfo.profileId,
                    timestamp: new Date().toISOString(),
                    content: attachmentUrls.postComment,
                    likeIds: [],
                    comments: [],
                    isRepost: true,
                    originalPostId: currentPostData.postId
                }));
                finalizePostActions("addRepostMenu");
            } else handleError("Cannot Find Post Data or Profile Data!");
        } else {
            dispatch(addPost({
                profileId: loggedInProfileInfo.profileId,
                content: attachmentUrls.postComment,
                timestamp: new Date().toISOString(),
                likeIds: [],
                comments: [],
                isRepost: false
            }));
            finalizePostActions("addNewPostMenu");
        }
    };


    const PictureAttachment = ({fileId, attachment, oldAltText}: {
        fileId: string;
        attachment: string;
        oldAltText: string | undefined;
    }) => {
        const handleShowAltTextMenu = (): void => {
            if (location === "create") {
                dispatch(togglePopUp({actionName: "addCommentMenu", actionArgument: false}));
            } else dispatch(togglePopUp({actionName: "addNewPostMenu", actionArgument: false}));
            dispatch(togglePopUp({actionName: "addAltTextMenu", actionArgument: true, actionState: fileId}));
        };

        return (
            <div className="addCommentOnPostMenu__imageAttachment">
                <button
                    className="addCommentOnPostMenu__attachment__removeBtn"
                    onClick={() => handleRemoveFile(fileId)}
                >
                    <CloseRoundedIcon style={{fontSize: '18px'}}/>
                </button>
                <button
                    className="addCommentOnPostMenu__attachment__altBtn"
                    onClick={handleShowAltTextMenu}
                >
                    ALT
                </button>
                <img src={attachment} alt={oldAltText}/>
            </div>
        );
    };
    const VideoAttachment = ({fileId, attachment}: { fileId: string, attachment: string }) => {
        return <div className="addCommentOnPostMenu__videoAttachment">
            <button
                className="addCommentOnPostMenu__attachment__removeBtn"
                onClick={() => handleRemoveFile(fileId)}
            >
                <CloseRoundedIcon style={{fontSize: "18px"}}/>
            </button>
            <video controls={true} disablePictureInPicture={true} loop={true} autoPlay={false}>
                <source src={attachment} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    };
    const GifAttachment = ({gif, altText}: { gif: GifFileType, altText: string }) => {
        const dispatch = useDispatch();

        const handleRemoveGifFile = (): void => {
            dispatch(removeGifAttachmentType());
        };

        return (
            <div className="addCommentOnPostMenu__gifAttachment">
                <button
                    className="addCommentOnPostMenu__attachment__removeBtn"
                    onClick={handleRemoveGifFile}
                >
                    <CloseRoundedIcon style={{fontSize: '18px'}}/>
                </button>
                <img src={gif.url} alt={altText}/>
            </div>
        );
    };

    return <motion.div
        className="addCommentOnPostMenu"
        initial={{opacity: 0, scale: 0.85}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.15}}
    >
        {showMentionList && <MentionWordList searchWord={searchWord} handleSelectSuggestion={handleSelectSuggestion}/>}
        {showHashtagList && <HashtagWordList searchWord={searchWord} handleSelectSuggestion={handleSelectSuggestion}/>}
        {((addType === "newComment" || addType === "newRepost") && currentPostData !== undefined) &&
            <section className="addCommentOnPostMenu__postContainer">
                <Post
                    previewType="briefPreview"
                    postType="post"
                    postData={currentPostData}
                />
            </section>}
        <section className="addCommentOnPostMenu__commentInputContainer">
            <div className="addCommentOnPostMenu__profilePictureContainer">
                <img
                    src={profile?.profileImage
                        ? profile.profileImage
                        : defaultProfilePicture}
                    alt="profile_picture"
                />
            </div>
            <section className="addCommentOnPostMenu__inputSection">
                <p className="addCommentOnPostMenu__inputSection__profileName">{profile?.profileName}</p>
                <PostTextEditor
                    editorState={editorState}
                    handleSetEditorState={handleSetEditorState}
                    profileName={addType === "newPost" ? profile?.profileName : addType === "newComment" ? replyProfile?.profileName : replyProfile?.profileName}
                    handleSetContent={handleSetContent}
                    handleShowSpecialWordList={handleShowSpecialWordList}
                    handleChangeSearchWord={handleChangeSearchWord}
                    type={addType}
                />
                {(Object.keys(attachmentUrls.files).length !== 0 || gifAttachmentData.gif.url !== "") && (
                    <motion.section
                        className="addCommentOnPostMenu__attachmentContainer noScroll"
                        initial={{opacity: 0,}}
                        animate={{opacity: 1,}}
                        transition={{duration: 0.15}}
                    >
                        {Object.entries(attachmentUrls.files).map(([fileId, file]) => {
                            const {src, alt} = file as Attachment;
                            if (src.startsWith('data:image/')) {
                                return <PictureAttachment
                                    key={fileId}
                                    fileId={fileId}
                                    attachment={src}
                                    oldAltText={alt}
                                />;
                            } else if (src.startsWith('data:video/')) {
                                return <VideoAttachment
                                    key={fileId}
                                    fileId={fileId}
                                    attachment={src}
                                />;
                            } else {
                                return null;
                            }
                        })}

                        {
                            gifAttachmentData.gif.url !== "" &&
                            <GifAttachment altText={gifAttachmentData.altText} gif={gifAttachmentData.gif}/>
                        }
                    </motion.section>
                )}
                <div className="addCommentOnPostMenu__attachmentOptions">
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple={true}
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                    {gifAttachmentData.gif.url === "" && <button
                        className="addCommentOnPostMenu__attachmentBtn"
                        onClick={handleButtonClick}
                    >
                        <PhotoLibraryOutlinedIcon/>
                        {Object.keys(attachmentUrls.files).length !== 0 && "Add"}
                    </button>}
                    {
                        (Object.keys(attachmentUrls.files).length === 0 && gifAttachmentData.gif.url === "") &&
                        <button className="addCommentOnPostMenu__attachmentBtn" onClick={handleOpenAddGifMenu}>
                            <GifBoxOutlinedIcon/>
                        </button>
                    }
                </div>
            </section>
        </section>
        <button
            className={`addCommentOnPostMenu__postBtn ${(attachmentUrls.postComment.length > 0
                || Object.keys(attachmentUrls.files).length !== 0) ? "activeBtn" : ""}`}
            style={{
                cursor: (attachmentUrls.postComment.length > 0
                    || Object.keys(attachmentUrls.files).length !== 0)
                    ? "pointer"
                    : "not-allowed",
            }}
            onClick={handlePost}
        >
            Post
        </button>
    </motion.div>
}

export default AddPostMenu;