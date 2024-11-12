import './likeListTemplate.css';
import {LikeListMenu} from "../../organisms/indexOrganisms";
import {ButtonType, LikeListButtonType} from "../../type/type";
import {useState} from "react";

const LikeListTemplate = () => {

    /* TODO: Add API call to change following state of a profile */
    const followButton: Omit<ButtonType, 'handleCallback'> = {
        buttonName: "follow",
        buttonStyle: "followButton",
        buttonType: "button",
    };
    const followingButton: Omit<ButtonType, 'handleCallback'> = {
        buttonName: "following",
        buttonStyle: "followingButton",
        buttonType: "button",
    };

    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const toggleFollow = (): void => {
        if (isFollowing) {
            setIsFollowing(false);
        } else {
            setIsFollowing(true);
        }
    };

    const buttonState: Omit<ButtonType, 'handleCallback'> = isFollowing ? followingButton : followButton;

    const buttonData: LikeListButtonType[] = [
        {
            profileName: "John Doe",
            ...buttonState,
            handleCallback: toggleFollow,
        },
        {
            profileName: "Jane Smith",
            ...buttonState,
            handleCallback: toggleFollow,
        },
    ];

    return <>
        <LikeListMenu likesCount={112} buttonData={buttonData}/>
    </>
};

export default LikeListTemplate;
