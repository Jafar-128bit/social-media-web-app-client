import './navbar.css';

/* Navbar Option Icons */
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';

import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import AutoModeIcon from '@mui/icons-material/AutoMode';

import {navbarOptionIconStyle, navbarThemeOptionIconStyle} from "../../style/style";
import {NavbarMenuOptionDataType, NavbarOptionDataType} from "../../type/type";

import {useNavigate, useLocation} from 'react-router-dom';
import {motion} from 'framer-motion';
import {JSX, useState} from 'react';
import {toggleMenu, togglePopMenuContainer} from "../../store/slices/popUpSlices";
import {useDispatch} from "react-redux";

type NavOptionsPropType = {
    icon: JSX.Element;
    url: string | null;
    currentLocation?: string;
    navigationAction: ((url: string) => void);
    buttonAction?: () => void;
}

const NavOptions = ({icon, url, currentLocation, navigationAction, buttonAction}: NavOptionsPropType): JSX.Element => {
    /* TODO: Add notification indicator */
    const [isHover, setIsHover] = useState<boolean>(false);
    const handleButtonClick = () => {
        if (url) navigationAction(url);
        else {
            if (buttonAction) buttonAction();
        }
    }

    return <button
        type="button"
        className="navbar__navOptions"
        onClick={handleButtonClick}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{color: url === currentLocation ? "var(--colorBlack)" : "var(--colorGray5)"}}
    >
        {icon}
        <motion.div
            className="navbar__navOptions__background"
            animate={{
                scale: isHover ? 1 : 0.5,
                opacity: isHover ? 1 : 0,
            }}
            transition={{
                duration: 0.1
            }}
        />
    </button>
};

const Navbar = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentLocation: string = useLocation().pathname;

    const navbarOptionData: NavbarOptionDataType[] = [
        {
            icon: <HomeRoundedIcon style={navbarOptionIconStyle}/>,
            url: "/",
            type: "url",
        },
        {
            icon: <SearchRoundedIcon style={navbarOptionIconStyle}/>,
            url: "/search",
            type: "url",
        },
        {
            icon: <AddCircleOutlineRoundedIcon style={navbarOptionIconStyle}/>,
            url: null,
            type: "button",
        },
        {
            icon: currentLocation === "/notification" ? <FavoriteRoundedIcon style={navbarOptionIconStyle}/>
                : <FavoriteBorderRoundedIcon style={navbarOptionIconStyle}/>,
            url: "/notification",
            type: "url",
        },
        {
            icon: <Person2RoundedIcon style={navbarOptionIconStyle}/>,
            url: "/profile",
            type: "url",
        },
    ];
    const menuOptionData: NavbarMenuOptionDataType[] = [
        {menuName: "Appearance", actionName: "openThemeMenu",},
        {menuName: "Settings", actionName: "gotoSettings",},
        {menuName: "Saved", actionName: "gotoSaved",},
        {menuName: "Your Likes", actionName: "gotoYourLikes",},
        {menuName: "Report", actionName: "openReportMenu",},
        {menuName: "Log Out", actionName: "logOutAction",},
    ];

    const [isMenuBtnHover, setIsMenuBtnHover] = useState<boolean>(false);
    const [isRefreshBtnHover, setIsRefreshBtnHover] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false);
    const [selectTheme, setSelectTheme] = useState<"auto" | "light" | "dark">("auto");

    const handleNavigation = (url: string): void => {
        if (url === "back") navigate(-1);
        else navigate(url);
    };
    const handleButton = (): void => {
        dispatch(togglePopMenuContainer(true));
        dispatch(toggleMenu({actionName: "addNewPostMenu", actionArgument: true}));
    }
    const handleShowMenu = (): void => {
        if (showThemeSelector) setShowThemeSelector(false);
        else setShowMenu(!showMenu);
    };
    const handleMenuAction = (actionName: "openThemeMenu" | "openReportMenu" | "gotoSettings" | "gotoSaved"
        | "gotoYourLikes" | "logOutAction" | "closeThemeMenu"): void => {
        switch (actionName) {
            case "openThemeMenu":
                setShowMenu(false);
                setShowThemeSelector(true);
                break;
            case "closeThemeMenu":
                setShowMenu(true);
                setShowThemeSelector(false);
                break;
            case "openReportMenu":
                setShowMenu(false);
                break;
            case "gotoSettings":
                navigate("/settings");
                setShowMenu(false);
                break;
            case "gotoSaved":
                navigate("/saved");
                setShowMenu(false);
                break;
            case "gotoYourLikes":
                navigate("/your-likes");
                setShowMenu(false);
                break;
            case "logOutAction":
                setShowMenu(false);
                //TODO: Make a Logout Action using redux state
                break;
            default:
                break;
        }
    };
    const handleRefreshHome = () => {
        /* TODO: Add Refresh function Button */
    };
    const handleThemeSelector = (theme: "auto" | "light" | "dark"): void => {
        setSelectTheme(theme);
    };

    const isShowBack: boolean = currentLocation === "/settings"
        || currentLocation === "/saved"
        || currentLocation === "/your-likes";

    return <nav className="navbar">
        <div className="navbar__mainNavigation__backgroundContainer"/>
        <section className="navbar__optionContainer">
            <motion.button
                type="button"
                className="navbar__refreshBtn"
                onMouseOver={() => setIsRefreshBtnHover(true)}
                onMouseLeave={() => setIsRefreshBtnHover(false)}
                onClick={handleRefreshHome}
                animate={{opacity: isRefreshBtnHover ? 1 : 0.35, rotate: isRefreshBtnHover ? -90 : 0}}
                transition={{duration: 0.15,}}
            >
                <RefreshRoundedIcon style={{...navbarOptionIconStyle, transform: "scaleX(-1)"}}/>
            </motion.button>
        </section>
        <section className="navbar__mainNavigation">
            {isShowBack && <motion.div
                className="navbar__mainNavigation__backOption"
                initial={{left: -100}}
                animate={{left: isShowBack ? 0 : -100}}
                transition={{duration: 0.15}}
            >
                <NavOptions
                    icon={<KeyboardBackspaceRoundedIcon style={navbarOptionIconStyle}/>}
                    url="back"
                    navigationAction={handleNavigation}
                />
            </motion.div>}
            <motion.div
                className="navbar__mainNavigation__mainOptions"
                animate={{width: isShowBack ? "70%" : "100%"}}
                transition={{duration: 0.15}}
            >
                {navbarOptionData.map((navOption: NavbarOptionDataType, index: number) => <NavOptions
                    key={index}
                    icon={navOption.icon}
                    url={navOption?.url}
                    currentLocation={currentLocation}
                    navigationAction={handleNavigation}
                    buttonAction={handleButton}
                />)}
            </motion.div>
        </section>
        <section className="navbar__optionContainer">
            <motion.button
                type="button"
                className="navbar__menuBtn"
                onMouseOver={() => setIsMenuBtnHover(true)}
                onMouseLeave={() => setIsMenuBtnHover(false)}
                onClick={handleShowMenu}
                animate={{
                    opacity: isMenuBtnHover || showMenu ? 1 : 0.35,
                }}
                transition={{
                    duration: 0.15,
                }}
            >
                <SortRoundedIcon style={{...navbarOptionIconStyle, transform: "scaleX(-1)"}}/>
            </motion.button>
            {showMenu && <motion.div
                className="navbar__menuOption"
                initial={{opacity: 0}}
                animate={{opacity: showMenu ? 1 : 0}}
                transition={{duration: 0.15}}
            >
                {menuOptionData.map((menuOptions: NavbarMenuOptionDataType, index: number) => <motion.button
                    key={index}
                    type="button"
                    className="navbar__menuOptionBtn"
                    initial={{opacity: 0, scaleX: 0.95}}
                    animate={{opacity: 1, scaleX: 1}}
                    transition={{delay: 0.05 * index, duration: 0.15}}
                    onClick={() => handleMenuAction(menuOptions.actionName)}
                >
                    {menuOptions.menuName}
                </motion.button>)}
            </motion.div>}
            {showThemeSelector && <motion.div
                className="navbar__themeMenu"
                initial={{scaleX: 0, opacity: 0}}
                animate={{scaleX: 1, opacity: 1}}
                transition={{duration: 0.15}}
            >
                <section className="navbar__themeMenu__heading">
                    <button type="button" className="navbar__themeMenu__closeBtn"
                            onClick={() => handleMenuAction("closeThemeMenu")}>
                        <KeyboardBackspaceRoundedIcon style={navbarThemeOptionIconStyle}/>
                    </button>
                    <p className="navbar__themeMenu__heading__title">Appearance</p>
                </section>
                <section className="navbar__themeMenu__themeOptions">
                    <button
                        type="button"
                        className="navbar__themeOptionsBtn"
                        onClick={() => handleThemeSelector("dark")}
                        style={{color: selectTheme === "dark" ? "var(--colorBlack)" : "var(--colorGray6)"}}
                    >
                        <NightlightRoundedIcon style={{
                            ...navbarThemeOptionIconStyle,
                            color: selectTheme === "dark" ? "var(--colorBlack)" : "var(--colorGray6)"
                        }}/> Dark
                    </button>
                    <button
                        type="button"
                        className="navbar__themeOptionsBtn"
                        onClick={() => handleThemeSelector("light")}
                        style={{color: selectTheme === "light" ? "var(--colorBlack)" : "var(--colorGray6)"}}
                    >
                        <LightModeRoundedIcon style={{
                            ...navbarThemeOptionIconStyle,
                            color: selectTheme === "light" ? "var(--colorBlack)" : "var(--colorGray6)"
                        }}/> Light
                    </button>
                    <button
                        type="button"
                        className="navbar__themeOptionsBtn"
                        onClick={() => handleThemeSelector("auto")}
                        style={{color: selectTheme === "auto" ? "var(--colorBlack)" : "var(--colorGray6)"}}
                    >
                        <AutoModeIcon style={{
                            ...navbarThemeOptionIconStyle,
                            color: selectTheme === "auto" ? "var(--colorBlack)" : "var(--colorGray6)"
                        }}/>
                        Auto
                    </button>
                    <motion.div
                        className="navbar__themeMenu__themeOptionHighlighter"
                        animate={{left: selectTheme === "dark" ? 0 : selectTheme === "light" ? 101 : 101 * 2}}
                        transition={{duration: 0.15}}
                    />
                </section>
            </motion.div>}
        </section>
    </nav>
}

export default Navbar;