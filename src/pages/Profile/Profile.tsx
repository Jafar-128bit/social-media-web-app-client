import './profile.css';

import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';
import {useState} from "react";
import ProfilePost from "../../components/ProfilePost/ProfilePost";

const Profile = () => {
    const [profileTab, setProfileTab] = useState<0 | 1 | 2>(0);

    const handleProfileTab = (profileOption: 0 | 1 | 2) => {
        setProfileTab(profileOption);
    }

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
                <span className="profile__profileInfoContainer__profileBioContent">
                    𝙴𝚊𝚝 | 𝙿𝚛𝚊𝚢 | 𝙲𝚘𝚍𝚎 | 𝙻𝚒𝚏𝚝 <br/>
                    🅳🅴🆅🅴🅻🅾🅿🅴🆁 🧑🏻‍💻 <br/>
                    "𝙰𝚕𝚕𝚊𝚑 𝚗𝚎𝚟𝚎𝚛 𝚌𝚑𝚊𝚗𝚐𝚎 𝚝𝚑𝚎 𝚌𝚘𝚗𝚍𝚒𝚝𝚒𝚘𝚗 𝚘𝚏 𝚙𝚎𝚘𝚙𝚕𝚎 𝚞𝚗𝚕𝚎𝚜𝚜 𝚝𝚑𝚎𝚢 𝚜𝚝𝚛𝚒𝚟𝚎 𝚝𝚘 𝚌𝚑𝚊𝚗𝚐𝚎 𝚝𝚑𝚎𝚖𝚜𝚎𝚕𝚟𝚎𝚜" 𝐐𝐮𝐫'𝐚𝐧 (𝟏𝟑:𝟏𝟏)
                </span>
            </div>
            <div className="profile__profileInfoContainer__LinksAndFollowersContainer">
                <p className="profile__profileInfoContainer__LinksAndFollowerCount">15 followers</p>
                <a
                    className="profile__profileInfoContainer__LinksAndFollowerCount"
                    href="www.github.com/Jafar-128bit"
                >
                    github.com/Jafar-128bit
                </a>
            </div>
            <div className="profile__profileInfoContainer__EditProfileButton">
                <button type="button">
                    Edit Profile
                </button>
            </div>
            <div className="profile__profileInfoContainer__ContentSwitchTab">
                <button
                    type="button"
                    className={`profile__profileInfoContainer__switchTabBtn ${profileTab === 0 ? "activeTab" : "inActiveTab"}`}
                    onClick={() => handleProfileTab(0)}
                >
                    Posts
                </button>
                <button
                    type="button"
                    className={`profile__profileInfoContainer__switchTabBtn ${profileTab === 1 ? "activeTab" : "inActiveTab"}`}
                    onClick={() => handleProfileTab(1)}
                >
                    Replies
                </button>
                <button
                    type="button"
                    className={`profile__profileInfoContainer__switchTabBtn ${profileTab === 2 ? "activeTab" : "inActiveTab"}`}
                    onClick={() => handleProfileTab(2)}
                >
                    Repost
                </button>
            </div>
        </section>
        <section className="profile__profile">

        </section>
        {profileTab === 0 &&
            <section className="profile__profileContentContainer">
                <ProfilePost/>
            </section>
        }
        {profileTab === 1 &&
            <section className="profile__profileContentContainer">Replies</section>
        }
        {profileTab === 2 &&
            <section className="profile__profileContentContainer">Repost</section>
        }
    </section>
}

export default Profile;