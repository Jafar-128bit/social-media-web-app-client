import {useState, useEffect} from 'react';
import {Condition} from "../type/type";

type HoverDataType = {
    [key: string]: boolean;
};

const useHoverData = (buttonCount: number) => {
    const [hoverData, setHoverData] = useState<HoverDataType>({});

    // Initialize hoverData with `false` for each button
    useEffect(() => {
        const initialHoverData: HoverDataType = {};
        for (let i = 1; i <= buttonCount; i++) {
            initialHoverData[`button${i}`] = false;
        }
        setHoverData(initialHoverData);
    }, [buttonCount]); // Re-initialize when buttonCount changes

    // Handle hover state changes
    const handleHover = (buttonKey: keyof HoverDataType, isHovering: boolean) => {
        setHoverData(prevState => {
            if (prevState[buttonKey] !== isHovering) {
                return {
                    ...prevState,
                    [buttonKey]: isHovering,
                };
            }
            return prevState; // No state change if hover state is the same
        });
    };

    // Get the appropriate button color based on hover state
    const getButtonColor = (conditions: Condition[]) => {
        for (let i: number = 0; i < conditions.length; i++) {
            if (conditions[i].check) {
                return conditions[i].transitionColor;
            }
        }
        return conditions.length > 0 ? conditions[0].baseColor : '';
    };


    return {hoverData, handleHover, getButtonColor};
};

export default useHoverData;