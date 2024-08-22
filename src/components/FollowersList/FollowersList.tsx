import './followersList.css';
import {ProfileDataType} from "../../type/type";
import {profileData} from "../../data/data";
import {useEffect, useState, FC} from "react";

interface FollowersListProps {
    profileId: number;
}

const FollowersList: FC<FollowersListProps> = ({profileId}) => {
    const [isFollowingTab, setIsFollowingTab] = useState(false);
    const [followerInfo, setFollowerInfo] = useState<ProfileDataType[]>([]);
    const [followingInfo, setFollowingInfo] = useState<ProfileDataType[]>([]);

    useEffect(() => {
        const findProfileInfo = profileData.find(profile => profile.profileId === profileId);

        if (findProfileInfo) {
            const followerList = profileData.filter(profile =>
                findProfileInfo.followers.includes(profile.profileId)
            );
            const followingList = profileData.filter(profile =>
                findProfileInfo.following.includes(profile.profileId)
            );

            setFollowerInfo(followerList);
            setFollowingInfo(followingList);
        }
    }, [profileId]);

    const handleChangeTab = (tab: "followers" | "following") => {
        setIsFollowingTab(tab === "following");
    }

    const ProfileCard: FC<{
        profileInfoData: ProfileDataType; type: "follower" | "following"
    }> = ({
              profileInfoData,
              type
          }) => {
        const isFollowing = profileInfoData.following.includes(profileId);

        return (
            <div className="followersList__ProfileCard">
                <section className="followersList__ProfileCard__profileInfoContainer">
                    <div className="followersList__ProfileCard__imageContainer">
                        <img src={profileInfoData.profileImage} alt={profileInfoData.username} height="100px"/>
                    </div>
                    <div className="followersList__ProfileCard__usernameContainer">
                        <p className="followersList__ProfileCard__username">{profileInfoData.username}</p>
                    </div>
                </section>
                <section className="followersList__ProfileCard__profileActionContainer">
                    <button
                        type="button"
                        className="followersList__ProfileCard__profileActionBtn"
                    >
                        {type === "follower" ? (isFollowing ? "following" : "follow back") : "following"}
                    </button>
                </section>
            </div>
        );
    }

    return (
        <div className="followersList">
            <section className="followersList__tabContainer">
                <button
                    type="button"
                    className={`followersList__tabBtn ${!isFollowingTab ? "followersList__activeBtn" : ""}`}
                    onClick={() => handleChangeTab("followers")}
                >
                    followers
                </button>
                <button
                    type="button"
                    className={`followersList__tabBtn ${isFollowingTab ? "followersList__activeBtn" : ""}`}
                    onClick={() => handleChangeTab("following")}
                >
                    following
                </button>
            </section>
            <section className="followersList__contentContainer">
                {!isFollowingTab && followerInfo.length > 0 && followerInfo.map(profile => (
                    <ProfileCard key={profile.profileId} profileInfoData={profile} type="follower"/>
                ))}
                {isFollowingTab && followingInfo.length > 0 && followingInfo.map(profile => (
                    <ProfileCard key={profile.profileId} profileInfoData={profile} type="following"/>
                ))}
            </section>
        </div>
    );
}

export default FollowersList;
