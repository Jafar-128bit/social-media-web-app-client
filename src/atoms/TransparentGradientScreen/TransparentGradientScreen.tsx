import './transparentGradientScreen.css';

type Prop = {
    rgbaValue: string;
    gradientLength: number;
}

const TransparentGradientScreen = ({rgbaValue, gradientLength}: Prop) => {

    return (
        <div
            className="transparentGradientScreen"
            style={{
                background: `linear-gradient(0deg, ${rgbaValue} ${gradientLength}%, rgba(255,255,255,0) 100%)`,
            }}
        />
    );
}

export default TransparentGradientScreen;
