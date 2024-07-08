import './profilePreviewCard.css';
/* Default Assets Import */
import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';

/* Import Icons */
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

/* Library Import */
import {motion} from 'framer-motion';
import {ProfileDataType} from "../../type/type";

type PropProfilePreview = {
    previewType: "menuType" | "hoverType";
    profile: ProfileDataType;
}

const ProfilePreviewCard = ({previewType, profile}: PropProfilePreview) => {
    return <motion.div
        className={`profilePreviewCard ${previewType === "menuType" ? "menuTypePreview" : "hoverTypePreview"}`}
        initial={{opacity: 0, scale: 0.85}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.15}}
    >

        <section className="profilePreviewCard__profileInfoContainer">
            <section className="profilePreviewCard__profileInfo">
                <p className="profilePreviewCard__profileInfo__profileName">{profile.profileName}</p>
                <p className="profilePreviewCard__profileInfo__userName">{profile.username}</p>
            </section>
            <section className="profilePreviewCard__profilePictureContainer">
                <img src={profile.profileImage ? profile.profileImage : defaultProfilePicture} alt="profile picture"
                     height="100"/>
            </section>
        </section>

        <section className="profilePreviewCard__profileDescriptionContainer">
            <p className="profilePreviewCard__profileDescription">
                {profile.profileInfo.profileDescription}
            </p>
            <p className="profilePreviewCard__profileFollowCount">{profile.followers.length} followers</p>
        </section>

        {previewType === "menuType" && <section className="profilePreviewCard__profileActionContainer">
            <button className="profilePreviewCard__profileActionBtn">
                Follow
                <PersonAddAltRoundedIcon style={{
                    fontSize: "22px",
                }}/>
            </button>
        </section>}

    </motion.div>
}

export default ProfilePreviewCard;