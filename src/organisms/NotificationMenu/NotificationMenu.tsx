import './notificationMenu.css';
import {NotificationContainer} from "../../molecules/IndexMolecules";
import {Button} from "../../atoms/IndexAtoms";
import {RefObject} from "react";
import { motion } from 'framer-motion';

type Prop = {
    menuRef: RefObject<HTMLDivElement>;
    menuState: boolean;
};

const NotificationMenu = ({menuRef, menuState}: Prop) => {
    return <motion.div
        className="notificationMenu"
        ref={menuRef}
        initial={{right: -410}}
        animate={{right: menuState ? 20 : -410}}
        transition={{duration: 0.25, ease: "easeOut"}}
    >
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
    </motion.div>
}

export default NotificationMenu;