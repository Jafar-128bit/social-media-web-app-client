import {ProfileActivityMenu} from "../../molecules/IndexMolecules";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {ButtonType} from "../../type/type";

const ProfileActivityMenuTemplate = () => {
    const location = useLocation();
    const [showProfileActivityMenu, setShowProfileActivityMenu] = useState<boolean>(false);

    useEffect(() => {
        if (location.pathname === "/profile") setShowProfileActivityMenu(true);
        else setShowProfileActivityMenu(false);
    }, [location.pathname]);

    //TODO: Add profile Activities handling functions which will contain navigation and state change

    const buttonData: ButtonType[] = [
        {
            handleCallback: () => {
            },
            buttonStyle: "profileActivityMenuButton",
            buttonType: "button",
            buttonName: "Saved Post"
        },
        {
            handleCallback: () => {
            },
            buttonStyle: "profileActivityMenuButton",
            buttonType: "button",
            buttonName: "Liked Post"
        },
        {
            handleCallback: () => {
            },
            buttonStyle: "profileActivityMenuButton",
            buttonType: "button",
            buttonName: "Comments"
        },
    ];

    return <>
        {showProfileActivityMenu && <ProfileActivityMenu buttonData={buttonData}/>}
    </>
}

export default ProfileActivityMenuTemplate;