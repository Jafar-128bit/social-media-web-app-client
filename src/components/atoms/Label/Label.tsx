import './label.css';

type Prop = {
    labelName: string;
    labelStyle: string;
    htmlFor: string;
}

const Label = ({labelName, labelStyle, htmlFor}: Prop) => {
    return <label className={`label ${labelStyle}`} htmlFor={htmlFor}>
        {labelName}
    </label>
}

export default Label;