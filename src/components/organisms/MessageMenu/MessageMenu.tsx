import './messageMenu.css';
import {Button} from "../../atoms/IndexAtoms";
import {RefObject} from "react";

type Prop = {
    menuRef: RefObject<HTMLDivElement>;
};

const MessageMenu = ({menuRef}: Prop) => {
    return <div className="messageMenu" ref={menuRef}>
        Message Menu
        <div className="messageMenu__buttonContainer">
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

export default MessageMenu;