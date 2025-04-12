import {AccountMenu, MessageMenu, NavigationTab, NotificationMenu} from '../../organisms/indexOrganisms';
import {useDispatch, useSelector} from "react-redux";
import {closeNavigationMenuState, updateNavigationMenuState} from "../../store/slices/navigationMenuSlices";
import {useMemo, useRef} from "react";
import useClickOutside from "../../hooks/useClickOutside";
import {
    EntityCreationNotification, ImageButtonType,
    LikeNotification,
    MentionNotification,
    NotificationTypeList
} from "../../type/type";
import useHoverData from "../../hooks/useHover";
import {ButtonImage} from "../../molecules/IndexMolecules";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {togglePopUp} from "../../store/slices/popUpSlices";
import {useNavigate} from "react-router-dom";

type Notification = LikeNotification | MentionNotification | EntityCreationNotification;
type NotificationList = Notification[];

const iconStyleNavigationTab = {
    fontSize: '32px',
    transition: "color 0.15s ease-in-out",
};

const iconStyleAccountMenu = {
    fontSize: '26px',
    transition: "color 0.15s ease-in-out",
};

const NavigationTemplate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigationMenuState = useSelector((state: any) => state.navigationMenuSlice);

    const buttonCount: number = 7;
    const navigationButtonBaseColor: string = 'var(--colorGray3)';
    const navigationButtonTransitionColor: string = 'var(--colorBlack)';

    const accountMenuButtonBaseColor: string = 'var(--colorGray3)';
    const accountMenuButtonTransitionColor: string = 'var(--colorBlack)';

    const {hoverData, handleHover, getButtonColor} = useHoverData(buttonCount);

    /* All the navigation Button DOM Ref */
    const notificationMenuButtonRef = useRef<HTMLButtonElement>(null);
    const messageMenuButtonRef = useRef<HTMLButtonElement>(null);
    const accountMenuButtonRef = useRef<HTMLButtonElement>(null);

    /* All the navigation menu DOM Ref */
    const notificationMenuRef = useRef<HTMLDivElement>(null);
    const messageMenuRef = useRef<HTMLDivElement>(null);
    const accountMenuRef = useRef<HTMLDivElement>(null);

    useClickOutside([notificationMenuButtonRef, notificationMenuRef], () => {
        dispatch(closeNavigationMenuState({menuName: "notificationMenu"}));
    });
    useClickOutside([messageMenuButtonRef, messageMenuRef], () => {
        dispatch(closeNavigationMenuState({menuName: "messageMenu"}));
    });
    useClickOutside([accountMenuButtonRef, accountMenuRef], () => {
        dispatch(closeNavigationMenuState({menuName: "accountMenu"}));
    });

    const handleNavigationTabButton = (menuName: "notificationMenu" | "messageMenu" | "accountMenu") => {
        dispatch(updateNavigationMenuState({menuName}));
    };
    const handleAddPostMenu = (): void => {
        dispatch(togglePopUp({actionName: "popUpContainer", actionArgument: true}));
        dispatch(togglePopUp({actionName: "addNewPostMenu", actionArgument: true}));
    };
    const handleNavigate = (route: string): void => {
        navigate(route);
    };
    const handleSignOut = () => {
        handleNavigate("/credential/sign-in");
    };

    const navigationMenuButtonData: ImageButtonType[] = useMemo((): ImageButtonType[] => [
        {
            handleCallback: () => handleNavigationTabButton("notificationMenu"),
            ButtonImage: <NotificationsNoneRoundedIcon style={{
                ...iconStyleNavigationTab,
                color: getButtonColor([
                    {
                        check: hoverData.button1,
                        baseColor: navigationButtonBaseColor,
                        transitionColor: navigationButtonTransitionColor
                    },
                    {
                        check: navigationMenuState.notificationMenu,
                        baseColor: navigationButtonBaseColor,
                        transitionColor: navigationButtonTransitionColor
                    }
                ]),
            }}/>,
            isShowBadge: true,
            badgeText: "B",
            buttonRef: notificationMenuButtonRef,
            onMouseLeave: () => handleHover('button1', false),
            onMouseOver: () => handleHover('button1', true),
        },
        {
            handleCallback: () => handleNavigationTabButton("messageMenu"),
            ButtonImage: <MessageOutlinedIcon style={{
                ...iconStyleNavigationTab,
                color: getButtonColor([
                    {
                        check: hoverData.button2,
                        baseColor: navigationButtonBaseColor,
                        transitionColor: navigationButtonTransitionColor
                    },
                    {
                        check: navigationMenuState.messageMenu,
                        baseColor: navigationButtonBaseColor,
                        transitionColor: navigationButtonTransitionColor
                    }
                ]),
            }}/>,
            isShowBadge: true,
            badgeText: "B",
            buttonRef: messageMenuButtonRef,
            onMouseLeave: () => handleHover('button2', false),
            onMouseOver: () => handleHover('button2', true),
        },
        {
            handleCallback: () => handleNavigationTabButton("accountMenu"),
            ButtonImage: <AccountCircleOutlinedIcon style={{
                ...iconStyleNavigationTab,
                color: getButtonColor([
                    {
                        check: hoverData.button3,
                        baseColor: navigationButtonBaseColor,
                        transitionColor: navigationButtonTransitionColor
                    },
                    {
                        check: navigationMenuState.accountMenu,
                        baseColor: navigationButtonBaseColor,
                        transitionColor: navigationButtonTransitionColor
                    }
                ]),
            }}/>,
            isShowBadge: true,
            badgeText: "B",
            buttonRef: accountMenuButtonRef,
            onMouseLeave: () => handleHover('button3', false),
            onMouseOver: () => handleHover('button3', true),
        }
    ], [hoverData, navigationMenuState]);
    const navigationEssentialButton: ImageButtonType[] = useMemo((): ImageButtonType[] => [
        {
            handleCallback: () => handleNavigate("/"),
            ButtonImage: <HomeRoundedIcon style={{
                ...iconStyleNavigationTab,
                color: getButtonColor([
                    {
                        check: hoverData.button4,
                        baseColor: navigationButtonBaseColor,
                        transitionColor: navigationButtonTransitionColor
                    }
                ]),
            }}/>,
            isShowBadge: false,
            onMouseLeave: () => handleHover('button4', false),
            onMouseOver: () => handleHover('button4', true),
        },
        {
            handleCallback: handleAddPostMenu,
            ButtonImage: <AddCircleOutlineRoundedIcon style={{
                ...iconStyleNavigationTab,
                color: getButtonColor([
                    {
                        check: hoverData.button8,
                        baseColor: navigationButtonBaseColor,
                        transitionColor: navigationButtonTransitionColor
                    }
                ]),
            }}/>,
            isShowBadge: false,
            onMouseLeave: () => handleHover('button8', false),
            onMouseOver: () => handleHover('button8', true),
        }
    ], [hoverData]);
    const accountMenuButtonData: ImageButtonType[] = useMemo((): ImageButtonType[] => [
        {
            handleCallback: () => handleNavigate("/setting"),
            ButtonImage: <ButtonImage
                Image={<SettingsOutlinedIcon style={{
                    ...iconStyleAccountMenu,
                    color: getButtonColor([
                        {
                            check: hoverData.button5,
                            baseColor: accountMenuButtonBaseColor,
                            transitionColor: accountMenuButtonTransitionColor
                        }
                    ]),
                }}/>}
                buttonName="Account Setting"
            />,
            isShowBadge: false,
            imageButtonStyle: "accountMenuStyleButton",
            onMouseLeave: () => handleHover('button5', false),
            onMouseOver: () => handleHover('button5', true),
        },
        {
            handleCallback: () => handleNavigate("/profile"),
            ButtonImage: <ButtonImage
                Image={<PortraitRoundedIcon style={{
                    ...iconStyleAccountMenu,
                    color: getButtonColor([
                        {
                            check: hoverData.button6,
                            baseColor: accountMenuButtonBaseColor,
                            transitionColor: accountMenuButtonTransitionColor
                        }
                    ]),
                }}/>}
                buttonName="Profile"
            />,
            isShowBadge: false,
            imageButtonStyle: "accountMenuStyleButton",
            onMouseLeave: () => handleHover('button6', false),
            onMouseOver: () => handleHover('button6', true),
        },
        {
            handleCallback: handleSignOut,
            ButtonImage: <ButtonImage
                Image={<LogoutRoundedIcon style={{
                    ...iconStyleAccountMenu,
                    color: getButtonColor([
                        {
                            check: hoverData.button7,
                            baseColor: accountMenuButtonBaseColor,
                            transitionColor: accountMenuButtonTransitionColor
                        }
                    ]),
                }}/>}
                buttonName="Sign Out"
            />,
            isShowBadge: false,
            imageButtonStyle: "accountMenuStyleButton",
            onMouseLeave: () => handleHover('button7', false),
            onMouseOver: () => handleHover('button7', true),
        },
    ], [hoverData]);

    return <>
        <NavigationTab
            navigationMenuButtonData={navigationMenuButtonData}
            navigationEssentialButton={navigationEssentialButton}
        />
        <NotificationMenu menuRef={notificationMenuRef} menuState={navigationMenuState.notificationMenu}/>
        <MessageMenu menuRef={messageMenuRef} menuState={navigationMenuState.messageMenu}/>
        <AccountMenu menuRef={accountMenuRef} accountMenuButtonData={accountMenuButtonData}
                     menuState={navigationMenuState.accountMenu}/>
    </>
}

export default NavigationTemplate;