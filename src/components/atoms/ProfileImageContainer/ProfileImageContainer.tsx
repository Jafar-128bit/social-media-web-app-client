import './profileImageContainer.css';
import defaultProfilePicture from '../../../assets/profileImages/defaultProfile.png';

const ProfileImageContainer = () => {
    return <div className="profileImageContainer">
        <img src={defaultProfilePicture} alt="profile picture"/>
    </div>
}

export default ProfileImageContainer;