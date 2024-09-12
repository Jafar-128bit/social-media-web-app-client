import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TokenUpdate {
    token: string;
    updateTokenName: "refresh" | "access";
}

type AuthTokenData = {
    accessToken: string;
    refreshToken: string;
}
const initialState: AuthTokenData = {
    accessToken: "",
    refreshToken: "",
};

const authTokenInfoSlice = createSlice({
    name: 'authTokenInfo',
    initialState,
    reducers: {
        updateToken: (state, action: PayloadAction<TokenUpdate>) => {
            const {token, updateTokenName} = action.payload;
            switch (updateTokenName) {
                case "access":
                    state.accessToken = token;
                    break;
                case "refresh":
                    state.refreshToken = token;
                    break;
                default:
                    break;
            }
        }
    },
});

export const {updateToken} = authTokenInfoSlice.actions;
export default authTokenInfoSlice.reducer;