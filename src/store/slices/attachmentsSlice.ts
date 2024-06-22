import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AttachmentsType} from "../../type/type";

const initialState: AttachmentsType = {
    postComment: "",
    files: {},
};

const attachmentsSlice = createSlice({
    name: 'attachments',
    initialState,
    reducers: {
        addAttachment(state, action: PayloadAction<{ fileId: string; src: string; alt?: string }>) {
            const {fileId, src, alt} = action.payload;
            state.files[fileId] = {src, alt};
        },
        removeAttachment(state, action: PayloadAction<string>) {
            delete state.files[action.payload];
        },
        updateAltText(state, action: PayloadAction<{ fileId: string; alt: string }>) {
            const {fileId, alt} = action.payload;
            if (state.files[fileId]) {
                state.files[fileId].alt = alt;
            }
        },
        updatePostComment(state, action: PayloadAction<string>) {
            state.postComment = action.payload;
        },
        clearAllAttachments(state) {
            state.files = {};
            state.postComment = "";
        },
    },
});

export const {
    addAttachment,
    removeAttachment,
    updateAltText,
    updatePostComment,
    clearAllAttachments
} = attachmentsSlice.actions;
export default attachmentsSlice.reducer;