import {MainProfileCard} from "../../organisms/indexOrganisms";
import useHover from "../../hooks/useHover";
import {FilterProfileDataType, ImageButtonType, ProfileDataType} from "../../type/type";
import {useEffect, useMemo, useState} from "react";

import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const iconStyle = {
    fontSize: '24px',
    transition: "color 0.15s ease-in-out",
}

const MainProfileCardTemplate = () => {
    const location = useLocation();
    const currentProfileData: ProfileDataType = useSelector((state: any) => state.authProfileSlice.profileData);

    const [isMinimize, setIsMinimize] = useState<boolean>(true);
    const [showProfileInfoWidget, setShowProfileInfoWidget] = useState<boolean>(false);
    const [filteredProfileData, setFilteredProfileData] = useState<FilterProfileDataType | null>(null);

    const {getButtonColor, hoverData, handleHover} = useHover(1);

    useEffect(() => {
        if (location.pathname === "/profile") setShowProfileInfoWidget(false);
        else setShowProfileInfoWidget(true);
    }, [location.pathname]);
    useEffect(() => {
        if (currentProfileData !== null) {
            setFilteredProfileData({
                profileId: currentProfileData.profileId,
                profileName: currentProfileData.profileName,
                username: currentProfileData.username,
                profileInfo: {
                    profileDescription: currentProfileData.profileInfo.profileDescription,
                    profileLinks: currentProfileData.profileInfo.profileLinks,
                },
                profileImage: currentProfileData.profileImage,
                followers: currentProfileData.followers.length,
                following: currentProfileData.following.length,
                isPrivate: currentProfileData.isPrivate,
                isVerified: currentProfileData.isVerified,
            });
        }
    }, [currentProfileData]);

    const handleMinimizeCard = (): void => {
        setIsMinimize(!isMinimize);
    };
    const handleOpenProfileSetting = (): void => {
        /* TODO: Add navigation to profile setting route */
    };

    const accountSettingButton: ImageButtonType = useMemo((): ImageButtonType => {
        return {
            handleCallback: () => handleOpenProfileSetting(),
            ButtonImage:
                <ManageAccountsRoundedIcon style={{
                    ...iconStyle,
                    color: getButtonColor([
                        {
                            check: hoverData.button1,
                            baseColor: 'var(--colorBlack)',
                            transitionColor: 'var(--colorWhite)'
                        }
                    ]),
                }}/>,
            isShowBadge: false,
            imageButtonStyle: "profileSettingButton",
            onMouseLeave: () => handleHover('button1', false),
            onMouseOver: () => handleHover('button1', true),
        }
    }, [hoverData]);
    const minimizeButton: ImageButtonType = {
        handleCallback: () => handleMinimizeCard(),
        ButtonImage: <KeyboardArrowUpRoundedIcon style={{
            ...iconStyle,
            transform: isMinimize ? 'rotate(90deg)' : 'rotate(-90deg)',
        }}/>,
        isShowBadge: false,
        imageButtonStyle: "mainProfileCardMinimizeBtnStyle",
    }

    return <>
        {(showProfileInfoWidget && filteredProfileData !== null) &&
            <MainProfileCard
                buttonData={[accountSettingButton, minimizeButton]}
                isMinimize={isMinimize}
                filteredProfileData={filteredProfileData}
            />}
    </>
}

export default MainProfileCardTemplate;