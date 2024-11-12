import './input.css';
import React, {ChangeEvent} from "react";

type Prop = {
    inputType: string;
    handleChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    name: string;
    value: string;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    inputStyleName: string;
}

const Input = ({inputType, handleChangeCallback, placeholder, name, value, inputStyleName, onBlur}: Prop) => {
    return <input
        className={`input ${inputStyleName}`}
        name={name}
        type={inputType}
        onChange={handleChangeCallback}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
    />
}

export default Input;