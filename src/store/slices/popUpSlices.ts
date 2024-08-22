import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PopUpType} from "../../type/type";

const initialState: PopUpType[] = [
    //State Dependent pop-ups
    {actionName: "followerListMenu", actionArgument: false, actionState: undefined},
    {actionName: "addCommentMenu", actionArgument: false, actionState: undefined},
    {actionName: "likedListMenu", actionArgument: false, actionState: undefined},
    {actionName: "deletePostMenu", actionArgument: false, actionState: undefined},
    {actionName: "followMenu", actionArgument: false, actionState: undefined},
    {actionName: "addRepostMenu", actionArgument: false, actionState: undefined},
    {actionName: "addAltTextMenu", actionArgument: false, actionState: undefined},
    //State Independent pop-ups
    {actionName: "addGif", actionArgument: false},
    {actionName: "popMenuContainer", actionArgument: false},
    {actionName: "addNewPostMenu", actionArgument: false},
    {actionName: "editProfileMenu", actionArgument: false},
    {actionName: "profilePictureMenu", actionArgument: false},
]

const popUpSlice = createSlice({
    name: "popUpSlices",
    initialState: initialState,
    reducers: {
        togglePopUp: (state, action: PayloadAction<PopUpType>) => {
            const {actionName, actionArgument, actionState} = action.payload;
            const findStateIndex = state.findIndex(initialState => initialState.actionName === actionName);
            if (findStateIndex !== -1) {
                state[findStateIndex].actionArgument = actionArgument;
                if (actionState !== undefined) state[findStateIndex].actionState = actionState;
            }
        },
        toggleCloseAll: (state) => {
            state.forEach((popUp) => {
                popUp.actionArgument = false;
                if (popUp.actionState !== undefined) {
                    popUp.actionState = undefined;
                }
            });
        }
    }
});

export const {togglePopUp, toggleCloseAll} = popUpSlice.actions;
export default popUpSlice.reducer;