import './pText.css';

interface PTextType {
    text: string;
    fontSize: number;
    fontWeight: number;
    color: string;
}

const PText = ({text, color, fontSize, fontWeight}: PTextType) => {
    return (
        <p className='pText' style={{
            fontSize: `${fontSize}px`,
            fontWeight: `${fontWeight}`,
            color: color,
        }}>{text}</p>
    );
};

export default PText;
