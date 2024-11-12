import './accountMenu.css';
import {ButtonContainer} from "../../molecules/IndexMolecules";

import {RefObject} from 'react';
import {ImageButtonType} from "../../type/type";
import { motion } from 'framer-motion';

type Prop = {
    menuRef: RefObject<HTMLDivElement>;
    accountMenuButtonData: ImageButtonType[];
    menuState: boolean;
};

const AccountMenu = ({menuRef, accountMenuButtonData, menuState}: Prop) => {

    return <motion.div
        className="accountMenu"
        ref={menuRef}
        initial={{right: -210}}
        animate={{right: menuState ? 20 : -210}}
        transition={{duration: 0.25, ease: "easeOut"}}
    >
        <ButtonContainer
            buttonList={accountMenuButtonData}
            buttonContainerStyle="accountMenuButtonContainer"
            buttonType="imageButtons"
        />
    </motion.div>
}

export default AccountMenu;