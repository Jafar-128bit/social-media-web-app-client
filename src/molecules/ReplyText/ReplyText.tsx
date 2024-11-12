import './replyText.css';
import {PText} from "../../atoms/IndexAtoms";

import {ReplyTextType} from "../../type/type";
import {TextPost} from "../IndexMolecules";


const ReplyText = ({text, fontSize, fontWeight, color, profileName}: ReplyTextType) => {

    return <p className='replyText'>
        <PText
            text={profileName}
            fontSize={fontSize + 2}
            fontWeight={fontWeight + 100}
            color={color}
        />
        <span className="replyText__gap"/>
        <TextPost
            text={text}
            fontSize={fontSize}
            fontWeight={fontWeight - 100}
        />
    </p>
};

export default ReplyText;
