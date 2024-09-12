import './notificationMenu.css';
import {NotificationContainer} from "../../molecules/IndexMolecules";
import {Button} from "../../atoms/IndexAtoms";
import {RefObject} from "react";

type Prop = {
    menuRef: RefObject<HTMLDivElement>;
};

const NotificationMenu = ({menuRef}: Prop) => {
    return <div className="notificationMenu" ref={menuRef}>
        <NotificationContainer/>
        <div className="notificationMenu__buttonContainer">
            <Button
                handleCallback={() => {
                }}
                buttonName="show more"
                buttonStyle="textButton"
                buttonType="button"
            />
        </div>
    </div>
}

export default NotificationMenu;