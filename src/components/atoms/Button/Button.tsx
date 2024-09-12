import './button.css';
import {ButtonType} from "../../../type/type";

const Button = ({handleCallback, buttonName, buttonType, buttonStyle}: ButtonType) => {
    return <button
        type={buttonType}
        className={`button ${buttonStyle}`}
        onClick={handleCallback}
    >
        {buttonName}
    </button>
}

export default Button;