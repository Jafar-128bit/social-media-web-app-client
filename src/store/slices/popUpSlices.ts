import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PopUpType} from "../../type/type";

interface PopUpState {
    [key: string]: PopUpType;
}

const initialState: PopUpState = {
    // State Dependent pop-ups
    followerListMenu: {actionArgument: false, actionState: undefined},
    addCommentMenu: {actionArgument: false, actionState: undefined},
    commentListMenu: {actionArgument: false, actionState: undefined},
    likedListMenu: {actionArgument: false, actionState: undefined},
    deletePostMenu: {actionArgument: false, actionState: undefined},
    followMenu: {actionArgument: false, actionState: undefined},
    addRepostMenu: {actionArgument: false, actionState: undefined},
    addAltTextMenu: {actionArgument: false, actionState: undefined},

    // State Independent pop-ups
    addGif: {actionArgument: false},
    addNewPostMenu: {actionArgument: false},
    editProfileMenu: {actionArgument: false},
    profilePictureMenu: {actionArgument: false},
    popUpContainer: {actionArgument: false},
}

const popUpSlice = createSlice({
    name: "popUpSlices",
    initialState: initialState,
    reducers: {
        togglePopUp: (state, action: PayloadAction<{ actionName: string, actionArgument: boolean, actionState?: any }>) => {
            const {actionName, actionArgument, actionState} = action.payload;
            const popUp = state[actionName];

            if (popUp) {
                popUp.actionArgument = actionArgument;
                if (actionState !== undefined) {
                    popUp.actionState = actionState;
                }
            }
        },
        toggleCloseAll: (state) => {
            Object.values(state).forEach((popUp) => {
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
