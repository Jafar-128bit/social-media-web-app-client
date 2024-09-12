import './navigationTab.css';
import {ImageButtonType} from "../../../type/type";
import {SearchInput, ButtonContainer} from '../../molecules/IndexMolecules'

import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {RefObject} from "react";

type Prop = {
    handleMenuStateFunction: (menuName: "notificationMenu" | "messageMenu" | "accountMenu") => void;
    buttonRefObject: {
        notificationMenuButtonRef: RefObject<HTMLButtonElement>;
        messageMenuButtonRef: RefObject<HTMLButtonElement>;
        accountMenuButtonRef: RefObject<HTMLButtonElement>;
    };
}

const iconStyle = {
    color: 'var(--colorGray3)',
    fontSize: '35px',
};

const NavigationTab = ({handleMenuStateFunction, buttonRefObject}: Prop) => {

    const navigationMenuButtonData: ImageButtonType[] = [
        {
            handleCallback: () => handleMenuStateFunction("notificationMenu"),
            ButtonImage: <NotificationsNoneRoundedIcon style={iconStyle}/>,
            isShowBadge: true,
            badgeText: "B",
            buttonRef: buttonRefObject.notificationMenuButtonRef,
        },
        {
            handleCallback: () => handleMenuStateFunction("messageMenu"),
            ButtonImage: <MessageOutlinedIcon style={iconStyle}/>,
            isShowBadge: true,
            badgeText: "B",
            buttonRef: buttonRefObject.messageMenuButtonRef,
        },
        {
            handleCallback: () => handleMenuStateFunction("accountMenu"),
            ButtonImage: <AccountCircleOutlinedIcon style={iconStyle}/>,
            isShowBadge: true,
            badgeText: "B",
            buttonRef: buttonRefObject.accountMenuButtonRef,
        }
    ];
    const navigationHomeButton: ImageButtonType[] = [
        {
            handleCallback: () => {
            },
            ButtonImage: <HomeRoundedIcon style={iconStyle}/>,
            isShowBadge: false,
        }
    ];

    return <div className="navigationTab">
        <span className="navigationTab__buttonContainer leftSide">
            <ButtonContainer
                buttonList={navigationHomeButton}
                buttonContainerStyle="navigationButtonContainer"
                buttonType="imageButtons"
            />
        </span>
        <SearchInput/>
        <span className="navigationTab__buttonContainer rightSide">
            <ButtonContainer
                buttonList={navigationMenuButtonData}
                buttonContainerStyle="navigationButtonContainer"
                buttonType="imageButtons"
            />
        </span>
    </div>
}

export default NavigationTab;