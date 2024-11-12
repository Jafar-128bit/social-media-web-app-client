import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WidgetType} from "../../type/type";

type WidgetState = {
    [key: string]: WidgetType;
}

const initialState: WidgetState = {
    profileInfoCard: {isShow: false},
}

const widgetSlice = createSlice({
    name: "widgetSlice",
    initialState: initialState,
    reducers: {
        toggleWidget: (state, action: PayloadAction<{ widgetName: string, isShow: boolean }>) => {
            const {widgetName, isShow} = action.payload;
            const widget = state[widgetName];
            if (widget) widget.isShow = isShow;
        },
    }
});

export const {toggleWidget} = widgetSlice.actions;
export default widgetSlice.reducer;