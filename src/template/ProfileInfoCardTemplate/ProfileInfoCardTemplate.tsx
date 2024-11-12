import {ProfileInfoCard} from "../../organisms/indexOrganisms";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {FilterProfileDataType, ProfileDataType} from "../../type/type";
import {useSelector} from "react-redux";

const ProfileInfoCardTemplate = () => {
    const location = useLocation();
    const currentProfileData: ProfileDataType = useSelector((state: any) => state.authProfileSlice.profileData);
    const [showProfileInfoCard, setShowProfileInfoCard] = useState<boolean>(false);
    const [filteredProfileData, setFilteredProfileData] = useState<FilterProfileDataType | null>(null);

    useEffect(() => {
        if (location.pathname === "/profile") setShowProfileInfoCard(true);
        else setShowProfileInfoCard(false);
    }, [location.pathname]);
    useEffect(() => {
        if (currentProfileData !== null) {
            setFilteredProfileData({
                profileId: currentProfileData.profileId,
                profileName: currentProfileData.profileName,
                username: currentProfileData.username,
                profileInfo: {
                    profileDescription: currentProfileData.profileInfo.profileDescription,
                    profileLinks: currentProfileData.profileInfo.profileLinks,
                },
                profileImage: currentProfileData.profileImage,
                followers: currentProfileData.followers.length,
                following: currentProfileData.following.length,
                isPrivate: currentProfileData.isPrivate,
                isVerified: currentProfileData.isVerified,
            });
        }
    }, [currentProfileData]);

    return <>
        {(showProfileInfoCard && filteredProfileData !== null) && <ProfileInfoCard filteredProfileData={filteredProfileData}/>}
    </>
}

export default ProfileInfoCardTemplate;