import './profile.css';

import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';

const Profile = () => {
    return <section className="profile">
        <section className="profile__profileInfoContainer">
            <div className="profile__profileInfoContainer__titleContainer">
                <div className="profile__profileInfoContainer__nameContainer">
                    <p className="profile__profileInfoContainer__name">Jafar Iqbal Choudhury</p>
                    <p className="profile__profileInfoContainer__userName">_jafariqbal</p>
                </div>
                <div className="profile__profileInfoContainer__profileImageContainer">
                    <img src={defaultProfilePicture} alt="profile_picture"/>
                </div>
            </div>
            <div className="profile__profileInfoContainer__profileBio">
                
            </div>
            <div className="profile__profileInfoContainer__LinksAndFollowersCount"></div>
            <div className="profile__profileInfoContainer__EditProfileButton"></div>
            <div className="profile__profileInfoContainer__ContentSwitchTab"></div>
        </section>
        <section className="profile__profile"></section>
        <section className="profile__profileContentContainer"></section>
    </section>
}

export default Profile;