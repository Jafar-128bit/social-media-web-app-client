import './accountMenu.css';
import {ButtonContainer} from "../../molecules/IndexMolecules";
import {ImageButtonType} from "../../../type/type";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PortraitRoundedIcon from '@mui/icons-material/PortraitRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import {JSX, RefObject} from 'react';

type Prop = {
    menuRef: RefObject<HTMLDivElement>;
};

const iconStyle = {
    color: 'var(--colorBlack)',
    fontSize: '26px',
};
const ButtonImage = ({Image, buttonName}: { Image: JSX.Element, buttonName: string }) => {
    return <div className="accountMenu__buttonImage">
        {Image}
        <p className="accountMenu__buttonName">{buttonName}</p>
    </div>
}

const AccountMenu = ({menuRef}: Prop) => {

    const accountMenuButtonData: ImageButtonType[] = [
        {
            handleCallback: () => {
            },
            ButtonImage: <ButtonImage Image={<SettingsOutlinedIcon style={iconStyle}/>} buttonName="Account Setting"/>,
            isShowBadge: false,
            imageButtonStyle: "accountMenuStyleButton"
        },
        {
            handleCallback: () => {
            },
            ButtonImage: <ButtonImage Image={<PortraitRoundedIcon style={iconStyle}/>} buttonName="Profile"/>,
            isShowBadge: false,
            imageButtonStyle: "accountMenuStyleButton"
        },
        {
            handleCallback: () => {
            },
            ButtonImage: <ButtonImage Image={<LogoutRoundedIcon style={iconStyle}/>} buttonName="Sign Out"/>,
            isShowBadge: false,
            imageButtonStyle: "accountMenuStyleButton"
        },
    ];

    return <div className="accountMenu" ref={menuRef}>
        <ButtonContainer
            buttonList={accountMenuButtonData}
            buttonContainerStyle="accountMenuButtonContainer"
            buttonType="imageButtons"
        />
    </div>
}

export default AccountMenu;