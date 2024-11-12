import {CommentListMenu} from "../../organisms/indexOrganisms";
import {useDispatch, useSelector} from "react-redux";
import {togglePopUp} from "../../store/slices/popUpSlices";
import {useState} from "react";

const CommentListTemplate = () => {
    const dispatch = useDispatch();
    const addCommentMenu = useSelector((state: any) => state.popUpSlice.addCommentMenu);

    const handleAddCommentMenu = () => {
        dispatch(togglePopUp({actionName: "addCommentMenu", actionArgument: true, actionState: 2}));
    };

    return <>
        <CommentListMenu
            handleAddCommentMenu={handleAddCommentMenu}
            showAddCommentMenuButton={addCommentMenu.actionArgument}
        />
    </>
};

export default CommentListTemplate;
