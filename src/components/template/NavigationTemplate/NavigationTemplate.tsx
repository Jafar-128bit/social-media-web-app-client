import './navigationTemplate.css'
import {AccountMenu, MessageMenu, NavigationTab, NotificationMenu} from '../../organisms/indexOrganisms';
import {useDispatch, useSelector} from "react-redux";
import {closeNavigationMenuState, updateNavigationMenuState} from "../../../store/slices/navigationMenuSlices";
import {useRef} from "react";
import useClickOutside from "../../../hooks/useClickOutside";

const NavigationTemplate = () => {
    const dispatch = useDispatch();
    const navigationMenuState = useSelector((state: any) => state.navigationMenuSlice);

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

    return <>
        <NavigationTab
            handleMenuStateFunction={handleNavigationTabButton}
            buttonRefObject={{
                notificationMenuButtonRef,
                messageMenuButtonRef,
                accountMenuButtonRef,
            }}
        />
        {navigationMenuState.notificationMenu && <NotificationMenu menuRef={notificationMenuRef}/>}
        {navigationMenuState.messageMenu && <MessageMenu menuRef={messageMenuRef}/>}
        {navigationMenuState.accountMenu && <AccountMenu menuRef={accountMenuRef}/>}
    </>
}

export default NavigationTemplate;