import './profilePreviewCard.css';
/* Default Assets Import */
import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';

/* Import Icons */
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

/* Library Import */
import {motion} from 'framer-motion';

type PropProfilePreview = {
    previewType: "menuType" | "hoverType";
}

const ProfilePreviewCard = ({previewType}: PropProfilePreview) => {
    return <motion.div
        className={`profilePreviewCard ${previewType === "menuType" ? "menuTypePreview" : "hoverTypePreview"}`}
        initial={{opacity: 0, scale: 0.85}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.15}}
    >

        <section className="profilePreviewCard__profileInfoContainer">
            <section className="profilePreviewCard__profileInfo">
                <p className="profilePreviewCard__profileInfo__profileName">Profile Name</p>
                <p className="profilePreviewCard__profileInfo__userName">_username</p>
            </section>
            <section className="profilePreviewCard__profilePictureContainer">
                <img src={defaultProfilePicture} alt="profile picture" height="100"/>
            </section>
        </section>

        <section className="profilePreviewCard__profileDescriptionContainer">
            <p className="profilePreviewCard__profileDescription">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed sagittis odio id mauris molestie, id luctus
                eros efficitur.
            </p>
            <p className="profilePreviewCard__profileFollowCount">2,504 followers</p>
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