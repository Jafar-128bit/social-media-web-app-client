import './commentTemplate.css';
import {useEffect, useState} from "react";
import {ButtonType, ImageButtonType, ProfileDataType} from "../../type/type";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import {CommentContainer} from "../../molecules/IndexMolecules";
import {AddReplyTemplate} from "../indexTemplate";
import {useSelector} from "react-redux";

interface FilteredDataType {
    username: string;
    profileImage: string | null;
}

const iconStyle = {
    fontSize: '18px',
};

const CommentTemplate = () => {

    const currentProfileData: ProfileDataType = useSelector((state: any) => state.authProfileSlice.profileData);

    /* TODO: this state will change with API call */
    const [isLike, setIsLike] = useState<boolean>(false);
    const [showAddReplyMenu, setShowAddReplyMenu] = useState<boolean>(false);
    const [filteredProfileData, setFilteredProfileData] = useState<FilteredDataType | null>(null);

    useEffect(() => {
        /* TODO: Make an API call */
        setFilteredProfileData({
            username: currentProfileData.username,
            profileImage: currentProfileData.profileImage,
        });
    }, [currentProfileData]);

    const handleLike = (): void => {
        setIsLike(!isLike);
    };
    const handleReply = (): void => {
        setShowAddReplyMenu(!showAddReplyMenu);
    };
    const handleShowReplyList = (): void => {
    };

    const likeButton: ImageButtonType = {
        ButtonImage: isLike
            ? <FavoriteRoundedIcon style={{...iconStyle, color: 'var(--color2)',}}/>
            : <FavoriteBorderRoundedIcon style={{...iconStyle, color: 'var(--colorGray3)',}}/>,
        handleCallback: handleLike,
        isShowBadge: false,
    };
    const normalButtonData: ButtonType[] = [
        {
            handleCallback: () => {
            },
            buttonName: '2 like',
            buttonStyle: 'textButton2',
            buttonType: "button",
        },
        {
            handleCallback: handleReply,
            buttonName: 'reply',
            buttonStyle: 'textButton2',
            buttonType: "button",
        },
        {
            handleCallback: () => {
            },
            buttonName: 'show replies',
            buttonStyle: 'textButton2',
            buttonType: "button",
        },
        {
            handleCallback: () => {
            },
            buttonName: 'Post',
            buttonStyle: 'affirmative',
            buttonType: "button",
        },
    ];

    return <>
        {
            filteredProfileData !== null && <CommentContainer
                likeButton={likeButton}
                normalButtonData={normalButtonData}
                filteredProfileData={filteredProfileData}/>
        }
        {
            filteredProfileData !== null && <AddReplyTemplate
                isReplyMenuShow={showAddReplyMenu}/>
        }
    </>
};

export default CommentTemplate;
