import './profile.css';

import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';
import Post from "../../components/Post/Post";
import {PostType} from "../../type/type";
import {profileData} from "../../data/data";
import {togglePopUp} from "../../store/slices/popUpSlices";

import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const loggedInProfileInfo = useSelector((state: any) => state.profileInfoSlice.profileInfo);
    const profileLink = useMemo(() => profileData.find(profile => profile.username === params.username), [params.username]);

    if (!profileLink) throw new Error('Profile not found');

    const profileIdLink: number = profileLink.profileId;
    const isMyProfile: boolean = profileIdLink === loggedInProfileInfo.profileId;

    const profile = useMemo(() => profileData
            .find(profile => profile.profileId === (isMyProfile ? loggedInProfileInfo.profileId : profileIdLink)),
        [isMyProfile, profileIdLink, loggedInProfileInfo.profileId]);

    if (!profile) throw new Error('Profile not found');

    const [currentPostList, setCurrentPostList] = useState<PostType[]>([]);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        if (!isMyProfile) {
            const myProfile = profileData.find(profile => profile.profileId === loggedInProfileInfo.profileId);
            setIsFollowing(myProfile ? myProfile.following.includes(profileLink.profileId) : false);
        }
    }, [isMyProfile, profileLink, loggedInProfileInfo.profileId]);

    const postList: PostType[] = useSelector((state: any) => state.postDataSlices);
    const posts: PostType[] = useMemo(() => profile ? postList.filter(post => post.profileId === profile.profileId) : [], [postList, profile]);
    const otherPosts: PostType[] = useMemo(() => profile ? postList.filter(post => post.profileId !== profile.profileId) : [], [postList, profile]);
    const replyPosts: PostType[] = useMemo(() => profile ? otherPosts.filter(post => post.comments.some(comment => comment.profileId === profile.profileId)) : [], [otherPosts, profile]);
    const repostList: PostType[] = useMemo(() => profile ? posts.filter(repost => repost.isRepost) : [], [postList, profile]);

    const handleProfileTab = (profileOption: "post" | "reply" | "repost"): void => navigate(`/profile/${params.username}/${profileOption}`);
    const handleFollowerList = () => {
        dispatch(togglePopUp({actionName: "popMenuContainer", actionArgument: true}));
        dispatch(togglePopUp({
            actionName: "followerListMenu",
            actionArgument: true,
            actionState: isMyProfile ? loggedInProfileInfo.profileId : profileIdLink
        }));
    }
    const handleEditProfileMenu = () => {
        dispatch(togglePopUp({actionName: "popMenuContainer", actionArgument: true}));
        dispatch(togglePopUp({actionName: "editProfileMenu", actionArgument: true}));
    }
    const handleProfilePicture = () => {
        dispatch(togglePopUp({actionName: "popMenuContainer", actionArgument: true}));
        dispatch(togglePopUp({
            actionName: "profilePictureMenu",
            actionArgument: true,
        }));
    }

    const PostList = ({postType}: { postType: "post" | "repost" }) => {
        useEffect(() => {
            if (postType === "post") setCurrentPostList(posts);
            else setCurrentPostList(repostList);
        }, []);

        return <section className="profile__profileContentContainer">
            {currentPostList.length > 0 ? currentPostList.map((value: PostType, index: number,) => <Post
                key={index}
                previewType="fullPreview"
                postType="post"
                postData={value}
            />) : <p className="profile__profileContentMessage">No Post</p>}
        </section>
    }
    const ReplyList = () => {
        useEffect(() => {
            setCurrentPostList(replyPosts);
        }, []);

        return <section className="profile__profileContentContainer">
            {currentPostList.map((post, index) => <div key={index} className="profile__postReplies">
                <Post
                    key={index}
                    previewType="fullPreview"
                    postType="post"
                    postData={post}
                />
                <div className="profile__replyPostContainer">
                    {
                        post.comments
                            .map((comment, index) => comment.profileId === profile?.profileId
                                ? <Post
                                    key={index}
                                    previewType="fullPreview"
                                    postType="reply"
                                    postData={comment}
                                />
                                : null)
                    }
                </div>
            </div>)}
        </section>
    }

    return <section className="profile">
        <section className="profile__profileInfoContainer">
            <div className="profile__profileInfoContainer__titleContainer">
                <div className="profile__profileInfoContainer__nameContainer">
                    <p className="profile__profileInfoContainer__name">{profile?.profileName}</p>
                    <p className="profile__profileInfoContainer__userName">{profile?.username}</p>
                </div>
                <div className="profile__profileInfoContainer__profileImageContainer" onClick={handleProfilePicture}>
                    <img
                        src={profile?.profileImage
                            ? profile.profileImage
                            : defaultProfilePicture}
                        alt="profile_picture"
                    />
                </div>
            </div>
            <div className="profile__profileInfoContainer__profileBio">
                <span className="profile__profileInfoContainer__profileBioContent">
                    {profile?.profileInfo.profileDescription}
                </span>
            </div>
            <div className="profile__profileInfoContainer__LinksAndFollowersContainer">
                <button
                    type="button"
                    className="profile__profileInfoContainer__LinksAndFollowerCount"
                    onClick={handleFollowerList}
                >
                    {profile?.followers.length} followers
                </button>
                <a
                    className="profile__profileInfoContainer__LinksAndFollowerCount"
                    href="www.github.com/Jafar-128bit"
                >
                    {profile?.profileInfo.profileLinks[0]}
                </a>
            </div>
            {isMyProfile && <div
                className={`profile__profileInfoContainer__EditProfileButton 
                    ${isMyProfile && "myProfile"}`}
            >
                <button type="button" onClick={handleEditProfileMenu}>Edit Profile</button>
            </div>}
            {!isMyProfile && <div
                className={`profile__profileInfoContainer__EditProfileButton 
                    ${!isMyProfile && "otherProfile"}`}
            >
                <button type="button">{isFollowing ? "Following" : "Follow"}</button>
                <button type="button">Block</button>
            </div>}
            <div className="profile__profileInfoContainer__ContentSwitchTab">
                <button
                    type="button"
                    className={`profile__profileInfoContainer__switchTabBtn 
                    ${params.tab === "post" ? "activeTab" : "inActiveTab"}`}
                    onClick={() => handleProfileTab("post")}
                >
                    Posts
                </button>
                <button
                    type="button"
                    className={`profile__profileInfoContainer__switchTabBtn 
                    ${params.tab === "reply" ? "activeTab" : "inActiveTab"}`}
                    onClick={() => handleProfileTab("reply")}
                >
                    Replies
                </button>
                <button
                    type="button"
                    className={`profile__profileInfoContainer__switchTabBtn 
                    ${params.tab === "repost" ? "activeTab" : "inActiveTab"}`}
                    onClick={() => handleProfileTab("repost")}
                >
                    Repost
                </button>
            </div>
        </section>

        <section className="profile__profile"></section>

        {params.tab === "post" && <PostList postType="post"/>}
        {params.tab === "reply" && <ReplyList/>}
        {params.tab === "repost" && <PostList postType="repost"/>}
    </section>
}

export default Profile;