import './editProfileMenu.css';
import {useDispatch, useSelector} from "react-redux";
import {profileData} from "../../data/data";
import {ProfileDataType} from "../../type/type";
import defaultProfilePicture from "../../assets/profileImages/defaultProfile.png";
import {useState} from "react";
import {motion} from 'framer-motion';
import {toggleCloseAll} from "../../store/slices/popUpSlices";

interface ProfilePicEditOptionType {
    optionName: string;
    optionAction: () => void;
}

const EditProfileMenu = () => {
    const dispatch = useDispatch();
    const currentProfile = useSelector((state: any) => state.profileInfoSlice.profileInfo);
    const profile: ProfileDataType | undefined = profileData.find(profile => profile.profileId === currentProfile.profileId);

    /* TODO: Make this state into a API Call to make an account a private or Vice-versa */
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [imageMenu, setImageMenu] = useState<boolean>(false);

    const handlePrivateSwitch = (): void => {
        setIsPrivate(!isPrivate);
    }
    const handleSubmit = (): void => {
        /* TODO: Here the edited profile info will be submitted with an API call */
        dispatch(toggleCloseAll());
    }
    const handleImageMenu = (): void => {
        setImageMenu(!imageMenu);
    }

    const editProfilePictureOptions: ProfilePicEditOptionType[] = [
        /* TODO: create an optionAction with API call for removing and uploading */
        {
            optionName: "Upload Picture",
            optionAction: (): void => {
            }
        },
        {
            optionName: "Remove current Picture",
            optionAction: (): void => {
            }
        },
    ];

    return <div className="editProfileMenu">
        <section className="editProfileMenu__nameEditContainer">
            <section className="editProfileMenu__nameContainer">
                <p className="editProfileMenu__editTitle">Name</p>
                <p className="editProfileMenu__name">{profile?.profileName}</p>
            </section>
            <div
                className="editProfileMenu__imageContainer"
                onClick={handleImageMenu}
            >
                <img
                    src={profile?.profileImage
                        ? profile.profileImage
                        : defaultProfilePicture}
                    alt="profile_picture"
                />
            </div>
            <motion.div
                className="editProfileMenu__imageMenu"
                initial={{zIndex: -1, opacity: 0}}
                animate={{zIndex: imageMenu ? 2 : -1, opacity: imageMenu ? 1 : 0}}
            >
                {editProfilePictureOptions.map((option, index: number) => <button
                    key={index}
                    className="editProfileMenu__imageMenuOptions"
                    onClick={option.optionAction}
                >
                    {option.optionName}
                </button>)}
            </motion.div>
        </section>
        <div className="editProfileMenu__separatorLine"/>
        <section className="editProfileMenu__bioEditContainer">
            <p className="editProfileMenu__editTitle">Bio</p>
            <p className="editProfileMenu__bioContainer">
                {profile?.profileInfo.profileDescription}
            </p>
        </section>
        <div className="editProfileMenu__separatorLine"/>
        <section className="editProfileMenu__linkEditContainer">
            <p className="editProfileMenu__editTitle">Link</p>
            <div className="editProfileMenu__linkContainer">
                {profile?.profileInfo.profileLinks.map((profileLink: string, index: number) => (
                    <a className="editProfileMenu__link" key={index} href={profileLink}>{profileLink}</a>
                ))}
            </div>
        </section>
        <div className="editProfileMenu__separatorLine"/>
        <section className="editProfileMenu__profileStatusEditContainer">
            <p className="editProfileMenu__editTitle">Private Profile</p>
            <button
                type="button"
                className="editProfileMenu__profileStatusBtn"
                style={{background: isPrivate ? "var(--colorGray3)" : "var(--colorGray6)",}}
                onClick={handlePrivateSwitch}
            >
                <motion.div
                    className="editProfileMenu__privateToggleSwitch"
                    initial={{x: 0}}
                    animate={{x: isPrivate ? 32 : 0}}
                    transition={{
                        duration: 0.25,
                        ease: "easeOut"
                    }}
                ></motion.div>
            </button>
        </section>
        <section className="editProfileMenu__submitContainer">
            <button type="button" className="editProfileMenu__submitBtn" onClick={handleSubmit}>
                Done
            </button>
        </section>
    </div>
}

export default EditProfileMenu;