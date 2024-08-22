import './home.css';
import Post from "../../components/Post/Post";
import {useSelector} from "react-redux";
import {PostType, ProfileDataType} from "../../type/type";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {profileData} from "../../data/data";

const Home = () => {
    const navigate = useNavigate();
    const loggedInProfileInfo = useSelector((state: any) => state.profileInfoSlice.profileInfo);
    const loggedProfileData: ProfileDataType | undefined = useMemo(() => profileData
        .find(profile => profile.profileId === loggedInProfileInfo.profileId), [loggedInProfileInfo]);
    const postList: PostType[] = useSelector((state: any) => state.postDataSlices);
    const currentPostList: PostType[] = postList
        .filter(post => loggedProfileData?.following.includes(post.profileId)
            || post.profileId === loggedProfileData?.profileId);

    useEffect(() => {
        if (!loggedInProfileInfo || loggedInProfileInfo.profileId === null) {
            navigate("/credential/sign-in");
            return;
        }
    }, [loggedInProfileInfo, navigate, postList]);

    return (
        <section className="home noScroll">
            {currentPostList.map((value: PostType, index: number) => <Post
                key={index}
                previewType="fullPreview"
                postType="post"
                postData={value}
            />)}
        </section>
    );
};

export default Home;
