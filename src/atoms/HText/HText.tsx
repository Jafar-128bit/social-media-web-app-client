import './hText.css';

type Prop = {
    titleTag: "h1" | "h2" | "h3" | "h4";
    titleInnerText: string;
    styleData: {
        fontWeight: number;
        fontSize: number;
        color: string;
    }
    headingStyleName: string;
}

const HText = ({titleTag, titleInnerText, styleData, headingStyleName}: Prop) => {
    const style = {
        fontWeight: styleData.fontWeight,
        fontSize: `${styleData.fontSize}px`,
        color: styleData.color,
    }
    switch (titleTag) {
        case "h1":
            return <h1 className={`hText ${headingStyleName}`} style={style}>{titleInnerText}</h1>;
        case "h2":
            return <h2 className={`hText ${headingStyleName}`} style={style}>{titleInnerText}</h2>;
        case "h3":
            return <h3 className={`hText ${headingStyleName}`} style={style}>{titleInnerText}</h3>;
        case "h4":
            return <h4 className={`hText ${headingStyleName}`} style={style}>{titleInnerText}</h4>;
        default:
            return <h5 className={`hText ${headingStyleName}`} style={style}>{titleInnerText}</h5>;
    }
}

export default HText;