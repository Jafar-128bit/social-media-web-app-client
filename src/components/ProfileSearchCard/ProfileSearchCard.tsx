import './profileSearchCard.css';

import defaultProfilePicture from "../../assets/profileImages/defaultProfile.png";

import ProfilePreviewCard from "../ProfilePreviewCard/ProfilePreviewCard";
import {ProfileDataType} from "../../type/type";

import {useState} from "react";
import {useNavigate} from "react-router-dom";

type PropProfileSearchCard = {
    profile: ProfileDataType;
}

const ProfileSearchCard = ({profile}: PropProfileSearchCard) => {
    const navigate = useNavigate();
    const [viewProfile, setViewProfile] = useState<boolean>(false);
    const handleProfilePreview = (flag: "hide" | "show") => {
        if (flag === "hide") setViewProfile(false);
        else setViewProfile(true);
    };
    const handelProfilePage = () => navigate(`/profile/${profile.username}/post`);

    return <div className="profileSearchCard">
        <div className="profileSearchCard__profilePictureContainer">
            <img src={profile.profileImage ? profile.profileImage : defaultProfilePicture} alt="profile picture"/>
        </div>
        <div className="profileSearchCard__infoContainer">
            <section className="profileSearchCard__info">
                <div
                    className="profileSearchCard__infoProfileName"
                    onClick={handelProfilePage}
                    onMouseOver={() => handleProfilePreview("show")}
                    onMouseLeave={() => handleProfilePreview("hide")}
                >
                    {profile.username}
                    {viewProfile && <ProfilePreviewCard previewType="hoverType" profile={profile}/>}
                </div>
                <p className="profileSearchCard__infoUsername">{profile.profileName}</p>
                <p className="profileSearchCard__infoFollowCount">{profile.followers.length} followers</p>
            </section>
            <section className="profileSearchCard__followBtnContainer">
                <button className="profileSearchCard__followBtn">Follow</button>
            </section>
        </div>
    </div>
}

export default ProfileSearchCard;