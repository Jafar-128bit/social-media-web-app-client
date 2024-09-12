import './pictureContainer.css';
import defaultProfilePicture from '../../../assets/profileImages/defaultProfile.png';

const PictureContainer = () => {
    return <div className="pictureContainer">
        <img src={defaultProfilePicture} alt="picture container"/>
    </div>
}

export default PictureContainer;