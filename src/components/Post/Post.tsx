import './post.css';

import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import PostActionButtons from "../PostActionButtons/PostActionButtons";
import {CommentType, PostMenuData, PostType, ProfileDataType} from "../../type/type";
import {formatDate} from "../../utils/utils";
import {profileData} from "../../data/data";

import {useMemo, useState} from "react";
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import ProfilePreviewCard from "../ProfilePreviewCard/ProfilePreviewCard";
import {useSelector} from "react-redux";

type PropFeedPost = {
    previewType: "fullPreview" | "briefPreview";
    postType: "post" | "reply";
    postData: PostType | CommentType;
}

const Post = ({
                  previewType,
                  postType,
                  postData,
              }: PropFeedPost) => {
    const navigate = useNavigate();
    const [showPostMenu, setShowPostMenu] = useState<boolean>(false);
    const [animatePostBtn, setAnimatePostBtn] = useState<boolean>(false);
    const [viewProfile, setViewProfile] = useState<boolean>(false);

    const postMenuData: PostMenuData[] = [
        {title: "Save", type: "normal", action: null},
        {title: "Hide", type: "normal", action: null},
        {title: "Mute", type: "normal", action: null},
        {title: "Block", type: "alert", action: null},
        {title: "Report", type: "alert", action: null},
    ];
    const replyMenuData: PostMenuData[] = [
        {title: "Delete", type: "normal", action: null},
        {title: "Block", type: "alert", action: null},
        {title: "Report", type: "alert", action: null},
    ];

    const loggedInProfileInfo = useSelector((state: any) => state.profileInfoSlice.profileInfo);

    const loggedProfileData: ProfileDataType | undefined = useMemo(() => profileData
        .find(profile => profile.profileId === loggedInProfileInfo.profileId), [loggedInProfileInfo]);
    const postProfile: ProfileDataType | undefined = useMemo(() => profileData
        .find(profile => profile.profileId === postData.profileId), [postData.profileId]);

    const isFollowingMe: boolean = (postProfile !== undefined && loggedProfileData !== undefined)
        ? loggedProfileData.following.includes(postProfile.profileId)
        : false;
    const isItMe: boolean = loggedInProfileInfo.profileId === postProfile?.profileId;

    const postList: PostType[] = useSelector((state: any) => state.postDataSlices);
    const repostData: PostType | undefined = postList.find(post => "originalPostId" in postData
        ? post.postId === postData.originalPostId
        : undefined);

    const handleProfilePreview = (flag: "hide" | "show") => {
        if (flag === "hide") setViewProfile(false);
        else setViewProfile(true);
    };
    const handelMenuData = (): PostMenuData[] => postType === "post" ? postMenuData : replyMenuData;
    const handleAnimateBtn = (flag: boolean): void => setAnimatePostBtn(flag);
    const handlePostMenu = (): void => setShowPostMenu(!showPostMenu);
    const handleOpenPost = (postId: number | undefined | null): void => {
        if (postId === null) return;
        else navigate(`/post/?key=${postId}`);
    };
    const handelProfilePage = () => navigate(`/profile/${postProfile?.username}/post`);

    return <div className="post">
        <section className="post__profileInfoContainer">
            <section className="post__imageSection">
                <div className="post__imageContainer">
                    <img
                        src={postProfile?.profileImage
                            ? postProfile.profileImage
                            : defaultProfilePicture}
                        alt="profile_picture"
                        height="100px"
                    />
                    {(!isFollowingMe && !isItMe) && <button type="button" className="post__followProfileBtn">
                        <AddRoundedIcon
                            style={{
                                color: "var(--colorWhite)",
                                width: "18px",
                                height: "18px"
                            }}
                        />
                    </button>}
                </div>
            </section>
            <section className="post__infoWrapper">
                <section className="post__profileInfo">
                    <div
                        className="post__profileUsername"
                        onClick={handelProfilePage}
                        onMouseOver={() => handleProfilePreview("show")}
                        onMouseLeave={() => handleProfilePreview("hide")}
                    >
                        {isItMe ? `You (${postProfile?.username})` : postProfile?.username}
                        {(viewProfile && postProfile) &&
                            <ProfilePreviewCard previewType="hoverType" profile={postProfile}/>}
                    </div>
                    <p className="post__postTime">{formatDate(postData.timestamp)}</p>
                </section>
                {previewType === "fullPreview" && <button
                    className="post__postMenuBtn"
                    onClick={handlePostMenu}
                    onMouseOver={() => handleAnimateBtn(true)}
                    onMouseLeave={() => handleAnimateBtn(false)}
                >
                    <motion.div
                        className="post__postMenuBtn__btnBackground"
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
                </button>}
                {(showPostMenu && previewType === "fullPreview") && <motion.div
                    className="post__postMenuBtn__postMenu"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.15,}}
                >
                    {handelMenuData().map((menuOption: PostMenuData, index: number) => <button
                        key={index}
                        className="post__postMenu__option"
                        style={{
                            color: menuOption.type === "alert" ? "var(--color2)" : "var(--colorBlack)",
                        }}
                    >
                        {menuOption.title}
                    </button>)}
                </motion.div>}
            </section>
        </section>
        <section className="post__ContentSection">
            <div className="post__postContentContainer">
                <div
                    className="post__postContent"
                    onClick={() => handleOpenPost("postId" in postData ? postData.postId : null)}
                >
                    {postData.content.length > 0 ? postData.content : null}
                </div>
                {"isRepost" in postData && postData.isRepost && repostData !== undefined
                    ? <div className="post__postContentRepostContainer">
                        <Post
                            previewType="briefPreview"
                            postType="post"
                            postData={repostData as PostType}
                        />
                    </div>
                    : null
                }
            </div>
        </section>
        {previewType === "fullPreview" &&
            <PostActionButtons
                likesCount={postData.likeIds?.length > 0 ? postData.likeIds?.length : null}
                commentCounts={"comments" in postData ? postData.comments.length > 0 ? postData.comments.length : null : 0}
                repostCounts={null}
                showButtons={{
                    c: postType === "post",
                    r: "isRepost" in postData ? !postData.isRepost : false,
                    s: true
                }}
                profileId={postData.profileId}
                postId={"postId" in postData ? postData.postId : undefined}
                isRepost={"isRepost" in postData ? postData.isRepost : false}
            />
        }
    </div>
}

export default Post;