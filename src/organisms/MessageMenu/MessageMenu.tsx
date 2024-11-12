import './messageMenu.css';
import {Button} from "../../atoms/IndexAtoms";
import {RefObject} from "react";
import { motion } from 'framer-motion';

type Prop = {
    menuRef: RefObject<HTMLDivElement>;
    menuState: boolean;
};

const MessageMenu = ({menuRef, menuState}: Prop) => {
    return <motion.div
        className="messageMenu"
        ref={menuRef}
        initial={{right: -360}}
        animate={{right: menuState ? 20 : -360}}
        transition={{duration: 0.25, ease: "easeOut"}}
    >
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
    </motion.div>
}

export default MessageMenu;