import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GifAttachmentType} from "../../type/type";

const initialState: GifAttachmentType = {
    gif: {
        width: 0,
        height: 0,
        size: 0,
        url: ""
    },
    altText: "",
};

const gifAttachmentSlice = createSlice({
    name: "gifAttachment",
    initialState: initialState,
    reducers: {
        addGifAttachment: (state, action: PayloadAction<GifAttachmentType>) => {
            const {gif, altText} = action.payload;
            state.gif = gif;
            state.altText = altText;
        },
        removeGifAttachmentType: () => {
            return {...initialState,};

        }
    },
});

export const {
    addGifAttachment,
    removeGifAttachmentType
} = gifAttachmentSlice.actions;
export default gifAttachmentSlice.reducer;