import './input.css';
import {ChangeEvent} from "react";

type Prop = {
    inputType: string;
    handleChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    value: string;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    inputStyleName: string;
}

const Input = ({inputType, handleChangeCallback, placeholder, name, value, inputStyleName}: Prop) => {
    return <input
        className={`input ${inputStyleName}`}
        name={name}
        type={inputType}
        onChange={handleChangeCallback}
        onBlur={blur}
        placeholder={placeholder}
        value={value}
    />
}

export default Input;