import './mentionWordList.css';

import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import VerifiedIcon from '@mui/icons-material/Verified';

import {motion} from "framer-motion";

import {ProfileDataType} from "../../type/type";
import useFilterData from "../../hooks/useFilterData";

type PropSpecialWordType = {
    searchWord: string;
    handleSelectSuggestion: (suggestion: string, wordType: "hashtag" | "mention") => void;
}

const MentionWordList = ({searchWord, handleSelectSuggestion}: PropSpecialWordType) => {
    const {filteredProfileData, loading, error} = useFilterData(searchWord, "profile");

    return <motion.div
        className={`mentionWordList noScroll ${loading ? "mentionWordList__alertMode" : "mentionWordList__listMode"}`}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.15}}
    >
        {loading && !error && <motion.div
            className="mentionWordList__loadingContainer"
            initial={{opacity: 0, rotate: 0}}
            animate={{opacity: 1, rotate: 360}}
            transition={{duration: 1, loop: Infinity, ease: "linear"}}
        >
            <RotateLeftRoundedIcon style={{
                color: "var(--colorGray4)",
                width: "32px",
                height: "32px"
            }}/>
        </motion.div>}
        {error && <p
            className="mentionWordList__error">
            <GppMaybeRoundedIcon style={{
                color: "var(--color2)",
                width: "22px",
                height: "22px"
            }}/>
            {error}
        </p>}
        {!loading && !error && filteredProfileData?.map((profile:  ProfileDataType, index: number) => <button
            key={index}
            className="mentionWordList__profileContainer"
            onClick={() => handleSelectSuggestion(`${profile.username} `, "mention")}
        >
            <div className="mentionWordList__profileImageContainer">
                <img src={profile.profileImage} alt={`Profile Picture of ${profile.profileName}`}/>
            </div>
            <div className="mentionWordList__profileInfoContainer">
                <p className="mentionWordList__profileName">
                    {profile.profileName}
                    {profile.isVerified && <VerifiedIcon style={{
                        color: "var(--color1)",
                        width: "16px",
                        height: "16px"
                    }}/>}
                </p>
                <p className="mentionWordList__profileUsername">@{profile.username}</p>
            </div>
        </button>)}
    </motion.div>
}

export default MentionWordList;