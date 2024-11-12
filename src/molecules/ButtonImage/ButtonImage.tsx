import './buttonImage.css';
import {JSX} from "react";

/* TODO: improve css with custom style option */

const ButtonImage = ({Image, buttonName}: { Image: JSX.Element, buttonName: string }) => {
    return <div className="buttonImage">
        {Image}
        {buttonName}
    </div>
}

export default ButtonImage;