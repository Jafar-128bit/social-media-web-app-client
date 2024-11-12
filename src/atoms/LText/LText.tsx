import './lText.css';
import {LTextType} from "../../type/type";

const LText = ({text, fontSize, fontWeight, color, width, height}: LTextType) => {
    return (
        <p className='lText' style={{
            fontSize: `${fontSize}px`,
            fontWeight: `${fontWeight}`,
            color: color,
            width: width,
            height: height,
        }}>{text}</p>
    );
};

export default LText;
