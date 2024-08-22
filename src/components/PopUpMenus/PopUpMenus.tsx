import './popUpMenus.css';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import {PopUpType} from "../../type/type";

import React, {JSX, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import AddPostMenu from "../AddPostMenu/AddPostMenu";
import AltTextMenu from "../AltTextMenu/AltTextMenu";
import AddGifMenu from "../AddGifMenu/AddGifMenu";

import {toggleCloseAll} from "../../store/slices/popUpSlices";
import {clearAllAttachments} from "../../store/slices/attachmentsSlice";
import FollowersList from "../FollowersList/FollowersList";
import EditProfileMenu from "../EditProfileMenu/EditProfileMenu";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

const PopUpMenuSelector = ({popMenuState}: { popMenuState: PopUpType[] }): JSX.Element | null => {

    const followerListMenu = popMenuState.find(popUp => popUp.actionName === "followerListMenu");
    const addGifMenu = popMenuState.find(popUp => popUp.actionName === "addGif");
    const addAltTextMenu = popMenuState.find(popUp => popUp.actionName === "addAltTextMenu");
    const addCommentMenu = popMenuState.find(popUp => popUp.actionName === "addCommentMenu");
    const addNewPostMenu = popMenuState.find(popUp => popUp.actionName === "addNewPostMenu");
    const editProfileMenu = popMenuState.find(popUp => popUp.actionName === "editProfileMenu");
    const profilePictureMenu = popMenuState.find(popUp => popUp.actionName === "profilePictureMenu");
    const addRepostMenu = popMenuState.find(popUp => popUp.actionName === "addRepostMenu");

    if (followerListMenu?.actionArgument) {
        if (typeof followerListMenu.actionState === "number") {
            return <FollowersList profileId={followerListMenu?.actionState}/>;
        } else return null;
    } else if (addNewPostMenu?.actionArgument) return <AddPostMenu addType="newPost"/>;
    else if (addCommentMenu?.actionArgument) return <AddPostMenu addType="newComment"/>;
    else if (addRepostMenu?.actionArgument) return <AddPostMenu addType="newRepost"/>;
    else if (addAltTextMenu?.actionArgument) {
        if (typeof addAltTextMenu.actionState === "string") {
            return <AltTextMenu fileId={addAltTextMenu.actionState}/>;
        } else return null;
    } else if (addGifMenu?.actionArgument) return <AddGifMenu/>;
    else if (editProfileMenu?.actionArgument) return <EditProfileMenu/>;
    else if (profilePictureMenu?.actionArgument) return <ProfilePicture/>;
    else return null;
};

const PopUpMenus = ({popMenuState}: { popMenuState: PopUpType[] }): JSX.Element => {

    const dispatch = useDispatch();
    const [showDiscardMenu, setShowDiscardMenu] = useState<boolean>(false);
    const attachmentUrls = useSelector((state: any) => state.attachmentsSlice);
    const addGifMenu = popMenuState.find(popUp => popUp.actionName === "addGif");
    const addAltTextMenu = popMenuState.find(popUp => popUp.actionName === "addAltTextMenu");
    const addCommentMenu = popMenuState.find(popUp => popUp.actionName === "addCommentMenu");
    const addNewPostMenu = popMenuState.find(popUp => popUp.actionName === "addNewPostMenu");

    const isHideCloseBtn: boolean = !addAltTextMenu?.actionArgument && !addGifMenu?.actionArgument;

    const handleClosePopMenuContainer = (): void => {
        if (addCommentMenu?.actionArgument || addNewPostMenu?.actionArgument) {
            const {postComment} = attachmentUrls;
            if (postComment.length > 0 || Object.keys(attachmentUrls.files).length > 0) {
                setShowDiscardMenu(true);
            } else {
                dispatch(toggleCloseAll());
            }
        } else {
            dispatch(toggleCloseAll());
        }
    };
    const handleDiscardMenu = (option: "discard" | "keep") => {
        switch (option) {
            case "discard":
                dispatch(clearAllAttachments());
                dispatch(toggleCloseAll());
                break;
            case "keep":
                setShowDiscardMenu(false);
                break;
            default:
                break;
        }
    };

    const DiscardMenu = (): JSX.Element => {
        return (
            <section className="popUpMenu__discardMenu__screen">
                <div className="popUpMenu__discardMenu">
                    <p className="popUpMenu__discardMenu__title">Discard Comment?</p>
                    <section className="popUpMenu__discardMenu__discardAction">
                        <button
                            className="popUpMenu__discardMenu__actionBtn discardBtn"
                            onClick={() => handleDiscardMenu("discard")}
                        >
                            Discard
                        </button>
                        <button
                            className="popUpMenu__discardMenu__actionBtn keepBtn"
                            onClick={() => handleDiscardMenu("keep")}
                        >
                            Keep
                        </button>
                    </section>
                </div>
            </section>
        );
    };

    return <section className="popUpMenu">
        {isHideCloseBtn && <button
            className="popUpMenu__closeMenuBtn"
            onClick={handleClosePopMenuContainer}
        >
            <CloseRoundedIcon style={{
                fontSize: "28px",
            }}/>
        </button>}
        {showDiscardMenu && <DiscardMenu/>}
        <PopUpMenuSelector popMenuState={popMenuState}/>
    </section>
}

export default PopUpMenus;