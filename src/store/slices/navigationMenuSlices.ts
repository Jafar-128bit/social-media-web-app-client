import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface NavigationMenuStateType {
    menuName: "notificationMenu" | "messageMenu" | "accountMenu";
}

interface ReqStateType {
    notificationMenu: boolean;
    messageMenu: boolean;
    accountMenu: boolean;
}

const initialState: ReqStateType = {
    notificationMenu: false,
    messageMenu: false,
    accountMenu: false,
}

const navigationMenuSlice = createSlice({
    name: 'navigationMenuState',
    initialState,
    reducers: {
        updateNavigationMenuState: (state, action: PayloadAction<NavigationMenuStateType>) => {
            const {menuName} = action.payload;

            const menuState_1 = state.notificationMenu;
            const menuState_2 = state.messageMenu;
            const menuState_3 = state.accountMenu;

            state.notificationMenu = false;
            state.messageMenu = false;
            state.accountMenu = false;

            switch (menuName) {
                case "notificationMenu":
                    state.notificationMenu = !menuState_1;
                    break;
                case "messageMenu":
                    state.messageMenu = !menuState_2;
                    break;
                case "accountMenu":
                    state.accountMenu = !menuState_3;
                    break;
                default:
                    throw new Error("Wrong Menu State Selected!");
            }
        },
        closeNavigationMenuState: (state, action: PayloadAction<NavigationMenuStateType>) => {
            const {menuName} = action.payload;
            if (menuName in state) state[menuName] = false;
            else throw new Error("Wrong Property Selected!")
        }
    },
});

export const {updateNavigationMenuState, closeNavigationMenuState} = navigationMenuSlice.actions;
export default navigationMenuSlice.reducer;