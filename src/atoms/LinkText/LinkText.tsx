import './linkText.css';

type LinkTextProps = {
    link: string;
    fontSize: number;
    fontWeight: number;
}

const LinkText = ({link, fontSize, fontWeight}: LinkTextProps) => {
    return <a href={link} className='linkText' style={{
        fontSize: `${fontSize}px`,
        fontWeight: `${fontWeight}`,
    }}>{link}</a>
};

export default LinkText;
