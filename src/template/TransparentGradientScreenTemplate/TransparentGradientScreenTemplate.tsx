import {TransparentGradientScreen} from "../../atoms/IndexAtoms";
import {useEffect, useState} from "react";

type Prop = {
    gradientLength: number;
    mainColorRGB: string;
    mainColorTransparentValue: number;
}

const TransparentGradientScreenTemplate = ({gradientLength, mainColorRGB, mainColorTransparentValue}: Prop) => {

    const [transparentValue, setTransparentValue] = useState<number>(mainColorTransparentValue / 100);
    const [rgbaValue, setRGBAValue] = useState<string>("");

    const handleRAGValue = () => {
        const rgbValues: string[] | null = mainColorRGB.split("rgb")[1].match(/\d+/g);
        if (rgbValues !== null) {
            const newRGBAValue: string = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${transparentValue})`;
            setRGBAValue(newRGBAValue);
        }
    };

    useEffect(() => {
        if (mainColorTransparentValue > 100) setTransparentValue(100);
        else setTransparentValue(mainColorTransparentValue / 100);
        handleRAGValue();
    }, [mainColorTransparentValue, mainColorRGB]);

    return <>
        <TransparentGradientScreen
            gradientLength={gradientLength}
            rgbaValue={rgbaValue}
        />
    </>
}

export default TransparentGradientScreenTemplate;