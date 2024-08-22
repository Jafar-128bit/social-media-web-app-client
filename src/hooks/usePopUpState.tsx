import {useSelector} from 'react-redux';
import {PopUpType} from "../type/type";

const usePopState = (): PopUpType[] => {
    return useSelector((state: any) => state.popUpMenuSlice);
};

export default usePopState;
