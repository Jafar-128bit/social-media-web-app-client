import './inputField.css';
import {Input, Label, MessageText} from '../../atoms/IndexAtoms';
import {ChangeEvent} from "react";

type Prop = {
    isShowLabel: boolean;
    labelName: string;
    labelStyle: string;
    inputType: string;
    handleChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    htmlFor: string;
    name: string;
    value: string;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    showError: string | false | undefined;
    errorMessage: string;
    inputStyleName: string;
}

const InputField = ({
                        isShowLabel,
                        labelName,
                        labelStyle,
                        inputType,
                        handleChangeCallback,
                        placeholder,
                        htmlFor,
                        name,
                        value,
                        onBlur,
                        showError,
                        errorMessage,
                        inputStyleName
                    }: Prop) => {
    return <div className="inputField">
        {isShowLabel && <Label
            labelName={labelName}
            labelStyle={labelStyle}
            htmlFor={htmlFor}
        />}
        <Input
            inputType={inputType}
            handleChangeCallback={handleChangeCallback}
            placeholder={placeholder}
            name={name}
            value={value}
            onBlur={onBlur}
            inputStyleName={inputStyleName}
        />
        {showError && <MessageText message={errorMessage} messageType="error"/>}
    </div>
}

export default InputField;