import {combineReducers} from 'redux';
import popUpSlice from "./slices/popUpSlices";
import attachmentsSlice from "./slices/attachmentsSlice";
import gifAttachmentSlice from "./slices/gifAttachmentSlice";

const rootReducer = combineReducers({
    popUpMenuSlice: popUpSlice,
    attachmentsSlice: attachmentsSlice,
    gifAttachmentSlice: gifAttachmentSlice,
});

export default rootReducer;