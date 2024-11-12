import {combineReducers} from 'redux';
import popUpSlice from "./slices/popUpSlices";
import gifAttachmentSlice from "./slices/gifAttachmentSlice";
import authTokenSlices from "./slices/authTokenSlices";
import navigationMenuSlice from "./slices/navigationMenuSlices";
import widgetSlices from "./slices/widgetSlices";
import authProfileSlice from "./slices/authProfileSlice";

const rootReducer = combineReducers({
    popUpSlice,
    gifAttachmentSlice,
    authTokenSlices,
    navigationMenuSlice,
    widgetSlices,
    authProfileSlice,
});

export default rootReducer;