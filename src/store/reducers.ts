import {combineReducers} from 'redux';
import popUpSlice from "./slices/popUpSlices";
import gifAttachmentSlice from "./slices/gifAttachmentSlice";
import authTokenSlices from "./slices/authTokenSlices";
import navigationMenuSlice from "./slices/navigationMenuSlices";

const rootReducer = combineReducers({
    popUpSlice,
    gifAttachmentSlice,
    authTokenSlices,
    navigationMenuSlice,

});

export default rootReducer;