import './profileImageContainer.css';
import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';

type Prop = {
    styleName: string;
    imageLink?: string | null;
}

const ProfileImageContainer = ({styleName, imageLink}: Prop) => {
    return <div className={`profileImageContainer ${styleName}`}>
        <img src={(imageLink !== null && imageLink !== undefined) ? imageLink : defaultProfilePicture} alt="profile picture"/>
    </div>
}

export default ProfileImageContainer;