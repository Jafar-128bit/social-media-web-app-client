import './addCommentMenu.css';
import React from "react";
import {CommentTemplate} from "../../template/indexTemplate";
import {Button} from "../../atoms/IndexAtoms";

type Prop = {
    handleAddCommentMenu: () => void,
    showAddCommentMenuButton: boolean;
}

const CommentListMenu = ({handleAddCommentMenu, showAddCommentMenuButton}: Prop) => {
    const stopPropagation = (e: React.MouseEvent): void => {
        e.stopPropagation();
    };

    return <div className='commentListMenu' onClick={stopPropagation}>
        {!showAddCommentMenuButton && <section className="commentListMenu__buttonContainer">
            <Button
                handleCallback={handleAddCommentMenu}
                buttonName="Add Comment"
                buttonType="button"
                buttonStyle="addCommentMenuButton"
            />
        </section>}
        <section className="commentListMenu__commentListContainer noScroll">
            <CommentTemplate/>
            <CommentTemplate/>
            <CommentTemplate/>
        </section>
    </div>
};

export default CommentListMenu;
