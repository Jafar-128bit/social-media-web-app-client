import './home.css';
import {PostContainerTemplate} from '../../template/indexTemplate';
import {FilteredPostData, PostType, ProfileDataType} from '../../type/type';
import {useSelector} from 'react-redux';
import useAPI from '../../hooks/useAPI';
import {useEffect, useState} from 'react';
import {apiEndpointMap} from '../../map/apiEndpointMap';
import {formatDate} from "../../utils/utils";

interface ReqData {
    profileId: string;
}

const Home = () => {
    const fetchMode = process.env.REACT_APP_FETCH_MODE;
    const currentProfileData: ProfileDataType = useSelector((state: any) => state.authProfileSlice.profileData);

    const {
        loading: postLoading,
        error: postError,
        response: postResponse,
        fetchData: fetchPostData
    } = useAPI<{ postData: PostType[] }, ReqData>();
    const {
        loading: profileLoading,
        error: profileError,
        response: profileResponse,
        fetchData: fetchProfileData
    } = useAPI<{ profileData: ProfileDataType[] }, ReqData>();

    const [filteredPostData, setFilteredPostData] = useState<FilteredPostData[] | null>(null);

    const handleGetPostData = async () => {
        if (!currentProfileData || !currentProfileData.profileId) {
            console.warn('No profile data available. Skipping data fetch.');
            return;
        }

        try {
            if (fetchMode === 'static') {
                await fetchPostData(`static/postData.json`, 'GET');
                await fetchProfileData('static/profileData.json', 'GET');

                if (postResponse && profileResponse) {
                    const { postData } = postResponse;
                    const { profileData } = profileResponse;

                    const filteredPosts = postData.filter(post =>
                        currentProfileData.following.includes(post.profileId)
                    );

                    const today = new Date().getTime();
                    const sortedPostDataByTimestamp = filteredPosts.sort((a: PostType, b: PostType) => {
                        const diffA = Math.abs(new Date(a.timestamp).getTime() - today);
                        const diffB = Math.abs(new Date(b.timestamp).getTime() - today);
                        return diffA - diffB;
                    });

                    const modifiedPostData = sortedPostDataByTimestamp.map((post: PostType) => {
                        const matchedProfile = profileData.find(profile => profile.profileId === post.profileId);
                        if (matchedProfile) {
                            return {
                                postId: post.postId,
                                profileId: post.profileId,
                                profileData: {
                                    profileImage: matchedProfile.profileImage,
                                    username: matchedProfile.username,
                                },
                                timestamp: formatDate(post.timestamp),
                                content: post.content,
                                likeIds: post.likeIds,
                                attachments: post.attachments,
                            };
                        }
                        return null;
                    }).filter(Boolean) as FilteredPostData[];
                    setFilteredPostData(modifiedPostData);
                    console.log("fix this loading err"); /* Jafar */
                } else {
                    if (postError) console.error('Error fetching static post data:', postError);
                    if (profileError) console.error('Error fetching static profile data:', profileError);
                }

            } else if (fetchMode === 'dynamic') {
                await fetchPostData(apiEndpointMap.signIn, 'POST', { profileId: currentProfileData.profileId });

                if (postError) console.error('Error during sign-in (dynamic mode):', postError);
                else console.info('Sign-in successful (dynamic mode):', postResponse);
            }
        } catch (err) {
            console.error('Error in handleGetPostData:', err);
        }
    };

    useEffect(() => {
        handleGetPostData().catch(err => console.error('Error in useEffect:', err));
    }, [currentProfileData]);

    return (
        <section className="home noScroll">
            {filteredPostData &&
                filteredPostData.map((value: FilteredPostData, index: number) => (
                    <PostContainerTemplate
                        key={index}
                        postData={value}
                    />
                ))}
        </section>
    );
};

export default Home;