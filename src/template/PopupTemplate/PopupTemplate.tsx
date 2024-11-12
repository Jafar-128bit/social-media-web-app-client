import './popupTemplate.css';
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {CommentListTemplate, AddPostTemplate, LikeListTemplate, AddCommentTemplate} from "../indexTemplate";
import {toggleCloseAll} from "../../store/slices/popUpSlices";

const PopupTemplate = () => {
    const dispatch = useDispatch();
    const addNewPostMenu = useSelector((state: any) => state.popUpSlice.addNewPostMenu);
    const popUpContainer = useSelector((state: any) => state.popUpSlice.popUpContainer);
    const likedListMenu = useSelector((state: any) => state.popUpSlice.likedListMenu);
    const addCommentMenu = useSelector((state: any) => state.popUpSlice.addCommentMenu);
    const commentListMenu = useSelector((state: any) => state.popUpSlice.commentListMenu);

    const handleCloseAll = (): void => {
        dispatch(toggleCloseAll());
    };

    return <motion.section
        className="popUpTemplate"
        initial={{opacity: 0, zIndex: -10}}
        animate={{opacity: popUpContainer.actionArgument ? 1 : 0, zIndex: popUpContainer.actionArgument ? 20 : -10}}
        onClick={handleCloseAll}
    >
        {addNewPostMenu.actionArgument && <AddPostTemplate/>}
        {likedListMenu.actionArgument && <LikeListTemplate/>}
        {commentListMenu.actionArgument && !addCommentMenu.actionArgument && (
            <CommentListTemplate />
        )}

        {addCommentMenu.actionArgument && (
            <div className="popUpTemplate__combineTemplatesContainer">
                <CommentListTemplate />
                {addCommentMenu.actionArgument && <AddCommentTemplate />}
            </div>
        )}
    </motion.section>
};

export default PopupTemplate;
