import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profileInfo: {
        profileId: null,
    },
};

const profileInfoSlice = createSlice({
    name: 'profileInfo',
    initialState,
    reducers: {
        updateProfileInfo: (state, action) => {
            state.profileInfo.profileId = action.payload;
        },
    },
});

export const { updateProfileInfo } = profileInfoSlice.actions;
export default profileInfoSlice.reducer;
