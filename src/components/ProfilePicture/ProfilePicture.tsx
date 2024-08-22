import './profilePicture.css';
import defaultProfilePicture from "../../assets/profileImages/defaultProfile.png";
import {ProfileDataType} from "../../type/type";
import {useMemo} from "react";
import {profileData} from "../../data/data";
import {useParams} from "react-router-dom";

const ProfilePicture = () => {
    const params = useParams();
    const profileLink = profileData.find(profile => profile.username === params.username);
    if (!profileLink) throw new Error('Profile not found');
    const profileIdLink: number = profileLink.profileId;
    const currentProfile = profileData.find(profile => profile.profileId === profileIdLink);

    if (!currentProfile) throw new Error('Profile not found');

    const username: string = currentProfile.username;
    const profile: ProfileDataType | undefined = useMemo(() => profileData.find(profile => profile.username === username), [profileData, username]);

    return <div className="profilePicture">
        <img
            src={profile?.profileImage
                ? profile.profileImage
                : defaultProfilePicture}
            alt="profile_picture"
        />
    </div>
}

export default ProfilePicture;