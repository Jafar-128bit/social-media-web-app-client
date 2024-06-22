import {useSelector} from 'react-redux';
import {PopUpMenuType} from "../type/type";

type PopStateResult = [
    popUpContainerState: boolean,
    popMenuState: PopUpMenuType,
];

const usePopState = (): PopStateResult => {
    const popMenuState: PopUpMenuType = useSelector((state: any) => state.popUpMenuSlice);

    const popUpContainerState: boolean = popMenuState.popUpMenuContainer;
    return [popUpContainerState, popMenuState];
};

export default usePopState;
