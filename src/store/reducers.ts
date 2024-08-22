import {combineReducers} from 'redux';
import popUpSlice from "./slices/popUpSlices";
import attachmentsSlice from "./slices/attachmentsSlice";
import gifAttachmentSlice from "./slices/gifAttachmentSlice";
import profileInfoSlice from "./slices/profileInfoSlice";
import postDataSlices from "./slices/postDataSlices";

const rootReducer = combineReducers({
    popUpMenuSlice: popUpSlice,
    attachmentsSlice: attachmentsSlice,
    gifAttachmentSlice: gifAttachmentSlice,
    profileInfoSlice: profileInfoSlice,
    postDataSlices: postDataSlices,

});

export default rootReducer;