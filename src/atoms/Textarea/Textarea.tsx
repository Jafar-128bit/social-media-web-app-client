import './textarea.css';
import React, {LegacyRef} from "react";

type Prop = {
    name: string;
    placeholder: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    styleName: string;
    textAreaRef?: LegacyRef<HTMLTextAreaElement> | null;
}

const Textarea = ({name, value, placeholder, handleChange, styleName, textAreaRef}: Prop) => {
    return <textarea
        ref={textAreaRef}
        className={`textarea ${styleName} noScroll`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={1}
    />
}

export default Textarea;