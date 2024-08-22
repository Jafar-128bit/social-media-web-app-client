import './postActionButtons.css';

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

import {motion} from "framer-motion";
import {togglePopUp} from "../../store/slices/popUpSlices";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addRepost} from "../../store/slices/postDataSlices";

type PropPostActionButtons = {
    likesCount: number | null;
    commentCounts: number | null;
    repostCounts: number | null;
    showButtons: { c: boolean, r: boolean, s: boolean };
    profileId?: number;
    postId?: number;
    isRepost: boolean;
}

const PostActionButtons = ({
                               likesCount,
                               commentCounts,
                               repostCounts,
                               showButtons,
                               profileId,
                               postId,
                           }: PropPostActionButtons) => {
    const dispatch = useDispatch();

    const loggedInProfileInfo = useSelector((state: any) => state.profileInfoSlice.profileInfo);

    const [animateActionBtn, setAnimateActionBtn] = useState<0 | 1 | 2 | 3 | 4>(0);
    const [isPostLike, setIsPostLike] = useState<boolean>(false);
    const [showRepostMenu, setShowRepostMenu] = useState<boolean>(false);
    const [showShareMenu, setShowShareMenu] = useState<boolean>(false);

    const handleAnimateActionBtn = (flag: 0 | 1 | 2 | 3 | 4) => setAnimateActionBtn(flag);
    const handleLikePostAction = () => setIsPostLike(!isPostLike);
    const handleRepostMenu = () => {
        setShowRepostMenu(!showRepostMenu);
        setShowShareMenu(false);
    };
    const handleShareMenu = () => {
        setShowShareMenu(!showShareMenu);
        setShowRepostMenu(false);
    };
    const handleAddCommentOnPost = () => {
        dispatch(togglePopUp({actionName: "popMenuContainer", actionArgument: true}));
        dispatch(togglePopUp({
            actionName: "addCommentMenu",
            actionArgument: true,
            actionState: {postId: postId, profileId: profileId}
        }));
    };
    const handleRepost = () => {
        if (profileId !== undefined) {
            dispatch(addRepost({
                profileId: loggedInProfileInfo.profileId,
                timestamp: `${new Date()}`,
                content: '',
                likeIds: [],
                comments: [],
                isRepost: true,
                originalPostId: postId
            }));
            setShowRepostMenu(false);
        } else new Error("Profile Id is missing!");
    }
    const handleQuotes = () => {
        dispatch(togglePopUp({actionName: "popMenuContainer", actionArgument: true}));
        dispatch(togglePopUp({
            actionName: "addRepostMenu",
            actionArgument: true,
            actionState: {originalPostId: postId, profileId: profileId}
        }));
        setShowRepostMenu(false);
    }

    const actionIconStyle = {color: "var(--colorGray4)", fontSize: "18px", zIndex: 1};
    const menuIconStyle = {color: "var(--colorBlack)", fontSize: "18px", zIndex: 1};

    return <div className="postActionContainer">
        {!showRepostMenu && <button
            type="button"
            className="postActionContainer__postActionBtn"
            onClick={handleLikePostAction}
            onMouseOver={() => handleAnimateActionBtn(1)}
            onMouseLeave={() => handleAnimateActionBtn(0)}
        >
            {isPostLike
                ? <FavoriteRoundedIcon style={{color: "var(--color2)", fontSize: "18px", zIndex: 1}}/>
                : <FavoriteBorderRoundedIcon style={actionIconStyle}/>}
            {likesCount && <p className="postActionContainer__actionCounter">{likesCount}</p>}
            <motion.div
                className="postActionContainer__postActionBtnBackground"
                initial={{width: 0, height: 0}}
                animate={{
                    width: animateActionBtn === 1 ? "100%" : "0",
                    height: animateActionBtn === 1 ? "100%" : "0"
                }}
                transition={{type: 'spring', duration: 0.25}}
            />
        </button>}

        {(showButtons.c && !showRepostMenu && !showShareMenu) && <button
            type="button"
            className="postActionContainer__postActionBtn"
            onClick={handleAddCommentOnPost}
            onMouseOver={() => handleAnimateActionBtn(2)}
            onMouseLeave={() => handleAnimateActionBtn(0)}
        >
            <MapsUgcRoundedIcon style={actionIconStyle}/>
            {commentCounts && <p className="postActionContainer__actionCounter">{commentCounts}</p>}
            <motion.div
                className="postActionContainer__postActionBtnBackground"
                initial={{width: 0, height: 0}}
                animate={{
                    width: animateActionBtn === 2 ? "100%" : "0",
                    height: animateActionBtn === 2 ? "100%" : "0"
                }}
                transition={{type: 'spring', duration: 0.25}}
            />
        </button>}

        {(showButtons.r && !showRepostMenu && !showShareMenu) && <button
            type="button"
            className="postActionContainer__postActionBtn"
            onClick={handleRepostMenu}
            onMouseOver={() => handleAnimateActionBtn(3)}
            onMouseLeave={() => handleAnimateActionBtn(0)}
        >
            <RepeatRoundedIcon style={actionIconStyle}/>
            {repostCounts && <p className="postActionContainer__actionCounter">{repostCounts}</p>}
            <motion.div
                className="postActionContainer__postActionBtnBackground"
                initial={{width: 0, height: 0}}
                animate={{
                    width: animateActionBtn === 3 ? "100%" : "0",
                    height: animateActionBtn === 3 ? "100%" : "0"
                }}
                transition={{type: 'spring', duration: 0.25}}
            />
        </button>}

        {(showButtons.s && !showRepostMenu && !showShareMenu) && <button
            type="button"
            className="postActionContainer__postActionBtn"
            onClick={handleShareMenu}
            onMouseOver={() => handleAnimateActionBtn(4)}
            onMouseLeave={() => handleAnimateActionBtn(0)}
        >
            <ShareRoundedIcon style={actionIconStyle}/>
            <motion.div
                className="postActionContainer__postActionBtnBackground"
                initial={{width: 0, height: 0}}
                animate={{
                    width: animateActionBtn === 4 ? "100%" : "0",
                    height: animateActionBtn === 4 ? "100%" : "0"
                }}
                transition={{type: 'spring', duration: 0.25}}
            />
        </button>}

        {showRepostMenu && <div className="postActionContainer__postActionsMenu">
            <button
                type="button"
                className="postActionContainer__postActionsSunBtn backBtnPostAction"
                onClick={handleRepostMenu}
            >
                <KeyboardBackspaceRoundedIcon style={menuIconStyle}/>
            </button>
            <button
                type="button"
                className="postActionContainer__postActionsSunBtn"
                onClick={handleRepost}
            >
                Repost <RepeatRoundedIcon style={menuIconStyle}/>
            </button>
            <button
                type="button"
                className="postActionContainer__postActionsSunBtn"
                onClick={handleQuotes}
            >
                Quote <FormatQuoteRoundedIcon style={menuIconStyle}/>
            </button>
        </div>}
        {showShareMenu && <div className="postActionContainer__postActionsMenu">
            <button
                type="button"
                className="postActionContainer__postActionsSunBtn backBtnPostAction"
                onClick={handleShareMenu}
            >
                <KeyboardBackspaceRoundedIcon style={menuIconStyle}/>
            </button>
            <button type="button" className="postActionContainer__postActionsSunBtn">
                Copy Link <ContentCopyRoundedIcon style={menuIconStyle}/>
            </button>
        </div>}
    </div>
}

export default PostActionButtons;