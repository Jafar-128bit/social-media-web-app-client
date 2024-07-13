import './profilePost.css';

import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useState} from "react";
import {motion} from 'framer-motion';
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import {toggleMenu, togglePopMenuContainer} from "../../store/slices/popUpSlices";
import {useDispatch} from "react-redux";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

const ProfilePost = () => {
    const dispatch = useDispatch();

    const [showPostMenu, setShowPostMenu] = useState<boolean>(false);
    const [animatePostBtn, setAnimatePostBtn] = useState<boolean>(false);
    const [isPostLike, setIsPostLike] = useState<boolean>(false);
    const [showRepostMenu, setShowRepostMenu] = useState<boolean>(false);
    const [showShareMenu, setShowShareMenu] = useState<boolean>(false);

    const handleAnimateBtn = (flag: boolean) => setAnimatePostBtn(flag);
    const handleLikePostAction = () => setIsPostLike(!isPostLike);
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

    return <div className="profilePost">
        <section className="profilePost__imageSection">
            <div className="profilePost__imageContainer">
                <img src={defaultProfilePicture} alt="profile picture or image" height="100px"/>
            </div>
        </section>
        <section className="profilePost__ContentSection">
            <div className="profilePost__profileInfoContainer">
                <section className="profilePost__profileInfo">
                    <p className="profilePost__profileUsername">_jafariqbal</p>
                    <p className="profilePost__postTime">10/06/2024</p>
                </section>
                <button
                    className="profilePost__postMenuBtn"
                    onClick={handlePostMenu}
                    onMouseOver={() => handleAnimateBtn(true)}
                    onMouseLeave={() => handleAnimateBtn(false)}
                >
                    <motion.div
                        className="profilePost__postMenuBtn__btnBackground"
                        initial={{
                            width: 0,
                            height: 0
                        }}
                        animate={{
                            width: animatePostBtn ? "30px" : 0,
                            height: animatePostBtn ? "30px" : 0
                        }}
                        transition={{type: 'spring', duration: 0.25}}
                    />
                    <MoreHorizIcon style={{
                        color: showPostMenu ? "var(--colorBlack)" : "var(--colorGray4)",
                        width: "18px",
                        height: "18px",
                        zIndex: 2,
                    }}/>
                </button>
            </div>
            <div className="profilePost__postContentContainer">
                Conquered nested options in my UI with a tree data structure! Each node stores data & a callback
                function for clicks. Scalable, maintainable, & flexible - perfect for complex hierarchies! #programming
                #UI #treedatastructure
            </div>
            <div className="profilePost__postActionContainer">
                <button type="button" className="profilePost__postActionBtn" onClick={handleLikePostAction}>
                    {isPostLike
                        ? <FavoriteRoundedIcon style={{color: "var(--color2)", fontSize: "22px",}}/>
                        : <FavoriteBorderRoundedIcon style={{fontSize: "22px",}}/>}
                </button>
                <button type="button" className="profilePost__postActionBtn" onClick={handleAddCommentOnPost}>
                    <MapsUgcRoundedIcon style={{
                        fontSize: "22px",
                    }}/>
                </button>
                <button type="button" className="profilePost__postActionBtn" onClick={handleRepostMenu}>
                    <RepeatRoundedIcon style={{
                        fontSize: "22px",
                    }}/>
                </button>
                <button type="button" className="profilePost__postActionBtn" onClick={handleShareMenu}>
                    <ShareRoundedIcon style={{
                        fontSize: "22px",
                    }}/>
                </button>
                {showRepostMenu && <div className="profilePost__postActionsMenu">
                    <button className="profilePost__postActionsSunBtn">
                        Repost <RepeatRoundedIcon style={{
                        fontSize: "22px",
                    }}/>
                    </button>
                    <button className="profilePost__postActionsSunBtn">
                        Quote <FormatQuoteRoundedIcon style={{
                        fontSize: "22px",
                    }}/>
                    </button>
                </div>}
                {showShareMenu && <div className="profilePost__postActionsMenu">
                    <button className="profilePost__postActionsSunBtn">
                        Copy Link <ContentCopyRoundedIcon style={{
                        fontSize: "22px",
                    }}/>
                    </button>
                </div>}
            </div>
        </section>
    </div>
}

export default ProfilePost;