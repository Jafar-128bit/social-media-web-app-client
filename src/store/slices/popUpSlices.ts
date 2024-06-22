import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PopUpMenuType} from "../../type/type";

type popActionType = {
    actionName: "popUpMenuContainer" | "profilePreview" | "addCommentOnPost" | "addCommentOnComment"
        | "repostWithQuote" | "reportProblem" | "reportPost" | "blockProfile" | "editComment" | "addGif"
        | "editProfile" | "editName" | "editDescription" | "editLink" | "showProfilePicture"
        | "deletePost" | "deleteComment" | "whoCanReply";
    actionArgument: boolean;
}

type popActionOptionType = {
    actionName: "addAltTextMenu";
    isOpen: boolean;
    referenceActionData: string;
}

const initialState: PopUpMenuType = {
    popUpMenuContainer: false,
    profilePreviewMenu: false,
    addCommentOnPostMenu: false,
    addCommentOnCommentMenu: false,
    addAltTextMenu: {isOpen: false, fileId: ""},
    addGifMenu: false,
    repostWithQuoteMenu: false,
    reportProblemMenu: false,
    reportPostMenu: false,
    blockProfileMenu: false,
    editCommentMenu: false,
    editProfileMenu: false,
    editNameMenu: false,
    editDescriptionMenu: false,
    editLinkMenu: false,
    showProfilePictureMenu: false,
    deletePostMenu: false,
    deleteCommentMenu: false,
    whoCanReplyMenu: false,
};

const popUpSlice = createSlice({
    name: "popUpSlice",
    initialState: initialState,
    reducers: {
        togglePopMenuContainer: (state, action: PayloadAction<boolean>) => {
            state.popUpMenuContainer = action.payload;
        },
        toggleMenu: (state, action: PayloadAction<popActionType>) => {
            const {actionName, actionArgument} = action.payload;
            switch (actionName) {
                case "profilePreview":
                    state.profilePreviewMenu = actionArgument;
                    break;
                case "addCommentOnPost":
                    state.addCommentOnPostMenu = actionArgument;
                    break;
                case "addCommentOnComment":
                    state.addCommentOnCommentMenu = actionArgument;
                    break;
                case "addGif":
                    state.addGifMenu = actionArgument;
                    break;
                case "repostWithQuote":
                    state.repostWithQuoteMenu = actionArgument;
                    break;
                case "reportProblem":
                    state.reportProblemMenu = actionArgument;
                    break;
                case "reportPost":
                    state.reportPostMenu = actionArgument;
                    break;
                case "blockProfile":
                    state.blockProfileMenu = actionArgument;
                    break;
                case "editComment":
                    state.editCommentMenu = actionArgument;
                    break;
                case "editProfile":
                    state.editProfileMenu = actionArgument;
                    break;
                case "editName":
                    state.editNameMenu = actionArgument;
                    break;
                case "editDescription":
                    state.editDescriptionMenu = actionArgument;
                    break;
                case "editLink":
                    state.editLinkMenu = actionArgument;
                    break;
                case "showProfilePicture":
                    state.showProfilePictureMenu = actionArgument;
                    break;
                case "deletePost":
                    state.deletePostMenu = actionArgument;
                    break;
                case "deleteComment":
                    state.deleteCommentMenu = actionArgument;
                    break;
                case "whoCanReply":
                    state.whoCanReplyMenu = actionArgument;
                    break;
                default:
                    break;
            }
        },
        toggleOptionsMenu: (state, action: PayloadAction<popActionOptionType>) => {
            const {actionName, isOpen, referenceActionData} = action.payload;

            switch (actionName) {
                case "addAltTextMenu":
                    state.addAltTextMenu.isOpen = isOpen;
                    state.addAltTextMenu.fileId = referenceActionData;
                    break;
                default:
                    break;
            }
        },
        toggleCloseAll: () => {
            return {...initialState,};
        }
    }
});

export const {togglePopMenuContainer, toggleMenu, toggleOptionsMenu, toggleCloseAll} = popUpSlice.actions;
export default popUpSlice.reducer;