import './popUpMenus.css';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import {PopUpMenuType} from "../../type/type";

import React, {JSX, useState} from 'react';
import ProfilePreviewCard from "../ProfilePreviewCard/ProfilePreviewCard";
import {useDispatch, useSelector} from "react-redux";
import {toggleCloseAll} from "../../store/slices/popUpSlices";
import AddCommentOnPostMenu from "../AddCommentOnPostMenu/AddCommentOnPostMenu";
import {clearAllAttachments} from "../../store/slices/attachmentsSlice";
import AltTextMenu from "../AltTextMenu/AltTextMenu";
import AddGifMenu from "../AddGifMenu/AddGifMenu";

interface PopUpMenuPropType {
    popMenuState: PopUpMenuType,
}

const PopUpMenuSelector = ({popMenuState,}: PopUpMenuPropType): JSX.Element | null => {
    const {
        popUpMenuContainer,
        profilePreviewMenu,
        addCommentOnPostMenu,
        addAltTextMenu,
        addGifMenu,
        addCommentOnCommentMenu,
        repostWithQuoteMenu,
        reportProblemMenu,
        reportPostMenu,
        blockProfileMenu,
        editCommentMenu,
        editProfileMenu,
        editNameMenu,
        editDescriptionMenu,
        editLinkMenu,
        showProfilePictureMenu,
        deletePostMenu,
        deleteCommentMenu,
        whoCanReplyMenu,
    } = popMenuState;

    if (profilePreviewMenu) return <ProfilePreviewCard previewType="menuType"/>;
    else if (addCommentOnPostMenu) return <AddCommentOnPostMenu/>;
        // else if (addCommentOnCommentMenu) return <AddCommentOnCommentMenu />;
        else if (addAltTextMenu.isOpen) return <AltTextMenu  fileId={addAltTextMenu.fileId}/>;
        else if (addGifMenu) return <AddGifMenu />;
        // else if (repostWithQuoteMenu) return <RepostWithQuoteMenu />;
        // else if (reportProblemMenu) return <ReportProblemMenu />;
        // else if (reportPostMenu) return <ReportPostMenu />;
        // else if (blockProfileMenu) return <BlockProfileMenu />;
        // else if (editCommentMenu) return <EditCommentMenu />;
        // else if (editProfileMenu) return <EditProfileMenu />;
        // else if (editNameMenu) return <EditNameMenu />;
        // else if (editDescriptionMenu) return <EditDescriptionMenu />;
        // else if (editLinkMenu) return <EditLinkMenu />;
        // else if (showProfilePictureMenu) return <ShowProfilePictureMenu />;
        // else if (deletePostMenu) return <DeletePostMenu />;
        // else if (deleteCommentMenu) return <DeleteCommentMenu />;
    // else if (whoCanReplyMenu) return <WhoCanReplyMenu />;
    else return null;
};

const PopUpMenus = ({popMenuState}: PopUpMenuPropType): JSX.Element => {

    const dispatch = useDispatch();
    const [showDiscardMenu, setShowDiscardMenu] = useState<boolean>(false);
    const attachmentUrls = useSelector((state: any) => state.attachmentsSlice);

    const {
        popUpMenuContainer,
        profilePreviewMenu,
        addCommentOnPostMenu,
        addCommentOnCommentMenu,
        addAltTextMenu,
        addGifMenu,
        repostWithQuoteMenu,
        reportProblemMenu,
        reportPostMenu,
        blockProfileMenu,
        editCommentMenu,
        editProfileMenu,
        editNameMenu,
        editDescriptionMenu,
        editLinkMenu,
        showProfilePictureMenu,
        deletePostMenu,
        deleteCommentMenu,
        whoCanReplyMenu,
    } = popMenuState;

    const isHideCloseBtn: boolean = !addAltTextMenu.isOpen && !addGifMenu;

    const handleClosePopMenuContainer = (): void => {
        if (addCommentOnPostMenu) {
            const {postComment} = attachmentUrls;
            if (postComment === "" && Object.keys(attachmentUrls.files).length !== 0) {
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