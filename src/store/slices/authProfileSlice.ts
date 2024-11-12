import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfileDataType} from "../../type/type";

type AuthProfileType = {
    profileData: ProfileDataType | null;
}

const initialState: AuthProfileType = {
    profileData: null
};

const authProfileSlice = createSlice({
    name: "authProfileSlice",
    initialState: initialState,
    reducers: {
        updateProfileData: (state, action: PayloadAction<AuthProfileType>) => {
            if (action.payload.profileData !== null) state.profileData = action.payload.profileData;
        },
    }
});

export const {updateProfileData} = authProfileSlice.actions;
export default authProfileSlice.reducer;