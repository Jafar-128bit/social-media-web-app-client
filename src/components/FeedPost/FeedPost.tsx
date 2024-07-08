import './feedPost.css';

import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

import {motion} from 'framer-motion';
import {useState} from "react";

import {PostMenuData} from "../../type/type";
import PostContent from "../PostContent/PostContent";
import {useDispatch} from "react-redux";
import {toggleMenu, togglePopMenuContainer} from "../../store/slices/popUpSlices";

const textContent: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis odio id mauris molestie, id luctus eros efficitur. Fusce vel justo ac tortor ullamcorper scelerisque. Nam gravida, lorem eu fermentum lobortis, purus odio placerat quam, vel vehicula ipsum sem a velit. Vivamus tempor, odio sit amet consequat consectetur."

type PropFeedPost = {
    previewType: "fullPreview" | "briefPreview"
}

const FeedPost = ({previewType}: PropFeedPost) => {
    const dispatch = useDispatch();

    const [isProfileHovered, setIsProfileHovered] = useState<boolean>(false);
    const [isPostLike, setIsPostLike] = useState<boolean>(false);
    const [showPostMenu, setShowPostMenu] = useState<boolean>(false);
    const [showRepostMenu, setShowRepostMenu] = useState<boolean>(false);
    const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
    const [showProfilePreviewCard, setShowProfilePreviewCard] = useState<boolean>(false);

    const postMenuData: PostMenuData[] = [
        {title: "Save", type: "normal", action: null},
        {title: "Hide", type: "normal", action: null},
        {title: "Mute", type: "normal", action: null},
        {title: "Block", type: "alert", action: null},
        {title: "Report", type: "alert", action: null},
    ];

    const handleProfileHovered = (): void => {
        setIsProfileHovered(!isProfileHovered);
    };
    const handleProfilePreviewMenu = (visibilityType: "hover" | "menu") => {
        if (previewType === "briefPreview") {
            //TODO: Add navigation and discard menu
            return;
        }

        if (visibilityType === "hover") {
            setShowProfilePreviewCard(!showProfilePreviewCard);
        } else {
            dispatch(togglePopMenuContainer(true));
            dispatch(toggleMenu({actionName: "profilePreview", actionArgument: true}));
        }
    };
    const handleLikePostAction = () => {
        setIsPostLike(!isPostLike);
    };
    const handlePostMenu = () => {
        setShowPostMenu(!showPostMenu);
        setShowRepostMenu(false);
        setShowShareMenu(false);
    };
    const handleRepostMenu = () => {
        setShowRepostMenu(!showRepostMenu);
        setShowPostMenu(false);
        setShowShareMenu(false);
    };
    const handleShareMenu = () => {
        setShowShareMenu(!showShareMenu);
        setShowRepostMenu(false);
        setShowPostMenu(false);

    };
    const handleAddCommentOnPost = () => {
        dispatch(togglePopMenuContainer(true));
        dispatch(toggleMenu({actionName: "addCommentOnPost", actionArgument: true}));
    };

    const handleOpenPost = () => {

    };

    return <div className="feedPost" onClick={handleOpenPost}>
        {/*{showProfilePreviewCard && <ProfilePreviewCard previewType="hoverType"/>}*/}
        <section className="feedPost__headingContainer">
            <section className="feedPost__headingContainer__accountInfo">
                <div
                    className="feedPost__accountInfo__profilePicture"
                    onClick={() => handleProfilePreviewMenu("menu")}
                    onMouseEnter={handleProfileHovered}
                    onMouseLeave={handleProfileHovered}
                >
                    <img src={defaultProfilePicture} alt="profile picture" height="30"/>
                    {/* TODO: If the user follow then it will be hidden */}
                    {previewType === "fullPreview" && <motion.button
                        className="feedPost__accountInfo__profileFollowBtn"
                        animate={{scale: isProfileHovered ? 1.1 : 1}}
                        transition={{duration: 0.15,}}
                    >
                        <AddRoundedIcon
                            style={{
                                color: "var(--colorWhite)",
                                width: "18px",
                                height: "18px"
                            }}
                        />
                    </motion.button>}
                </div>

                <div className="feedPost__accountInfo__profileInfo">
                    <p className="feedPost__profileInfo__profileName"
                       onMouseOver={() => handleProfilePreviewMenu("hover")}
                       onMouseLeave={() => handleProfilePreviewMenu("hover")}
                    >
                        Profile Name
                    </p>
                    <VerifiedIcon style={{
                        color: "var(--color1)",
                        width: "16px",
                        height: "16px"
                    }}/>
                    <p className="feedPost__profileInfo__postTime">22h</p>
                </div>
            </section>
            {previewType === "fullPreview" && <button
                type="button"
                className="feedPost__headingContainer__postMenuBtn"
                onClick={handlePostMenu}
            >
                <MoreHorizIcon style={{
                    color: showPostMenu ? "var(--colorBlack)" : "var(--colorGray4)",
                    width: "28px",
                    height: "28px"
                }}/>
            </button>}
            {(showPostMenu && previewType === "fullPreview") && <motion.div
                className="feedPost__headingContainer__postMenu"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.15,}}
            >
                {postMenuData.map((menuOption: PostMenuData, index: number) => <button
                    key={index}
                    className="feedPost__postMenu__option"
                    style={{
                        color: menuOption.type === "alert" ? "var(--color2)" : "var(--colorBlack)",
                    }}
                >
                    {menuOption.title}
                </button>)}
            </motion.div>}
        </section>

        <PostContent textContent={textContent} attachment={null}/>

        {previewType === "fullPreview" && <section className="feedPost__postActions">
            {/* Add Like */}
            <button
                className="feedPost__postActions__btn"
                onClick={handleLikePostAction}
            >
                {isPostLike
                    ? <FavoriteRoundedIcon style={{color: "var(--color2)", fontSize: "22px",}}/>
                    : <FavoriteBorderRoundedIcon style={{fontSize: "22px",}}/>}
            </button>
            {/* Add Comment */}
            <button className="feedPost__postActions__btn" onClick={handleAddCommentOnPost}>
                <MapsUgcRoundedIcon style={{
                    fontSize: "22px",
                }}/>
            </button>
            {/* Repost */}
            <button
                className="feedPost__postActions__btn"
                onClick={handleRepostMenu}
                style={{
                    background: showRepostMenu ? "var(--colorGray7)" : "",
                }}
            >
                {/* TODO: Add repost indicator */}
                <RepeatRoundedIcon style={{
                    fontSize: "22px",
                }}/>
            </button>
            {/* Share */}
            <button
                className="feedPost__postActions__btn"
                onClick={handleShareMenu}
                style={{
                    background: showShareMenu ? "var(--colorGray7)" : "",
                }}
            >
                <ShareRoundedIcon style={{
                    fontSize: "22px",
                }}/>
            </button>

            {showRepostMenu && <div className="feedPost__postActionsMenu">
                <button className="feedPost__postActionsBtn">
                    Repost <RepeatRoundedIcon style={{
                    fontSize: "22px",
                }}/>
                </button>
                <button className="feedPost__postActionsBtn">
                    Quote <FormatQuoteRoundedIcon style={{
                    fontSize: "22px",
                }}/>
                </button>
            </div>}
            {showShareMenu && <div className="feedPost__postActionsMenu">
                <button className="feedPost__postActionsBtn">
                    Copy Link <ContentCopyRoundedIcon style={{
                    fontSize: "22px",
                }}/>
                </button>
            </div>}
        </section>}
        {previewType === "fullPreview" && <section className="feedPost__postAnalytics">
            <section className="feedPost__postAnalytics__profilePreviewContainer">
                <div
                    className="feedPost__postAnalytics__profilePreview"
                    style={{left: "0", zIndex: 1}}
                >
                    <img src={defaultProfilePicture} alt="engaged profile picture" height="18"/>
                </div>
                <div
                    className="feedPost__postAnalytics__profilePreview"
                    style={{left: "calc((18px * 1) - (5px * 1))", zIndex: 2}}
                >
                    <img src={defaultProfilePicture} alt="engaged profile picture" height="18"/>
                </div>
                <div
                    className="feedPost__postAnalytics__profilePreview"
                    style={{left: "calc((18px * 2) - (5px * 2))", zIndex: 3}}
                >
                    <img src={defaultProfilePicture} alt="engaged profile picture" height="18"/>
                </div>
            </section>
            <p className="feedPost__postAnalytics__replyCount">234 replies</p>
            <p className="feedPost__postAnalytics__likeCount">316 likes</p>
        </section>}
    </div>
}

export default FeedPost;