import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CommentType, PostType} from "../../type/type";

type EditPostPropType = {
    postId: number;
    editOption: "like" | "addComment" | "unLike" | "removeComment";
    profileId: number;
    commentContent?: string;
    commentId?: number;
}

const initialPostDataState: Array<PostType> = [];

const postsDataSlices = createSlice({
    name: "postDataSlices",
    initialState: initialPostDataState,
    reducers: {
        addPost: (state, action: PayloadAction<PostType>) => {
            const {profileId, timestamp, content, likeIds, comments, isRepost} = action.payload;
            const newPost: PostType = {
                postId: state.length,
                profileId: profileId,
                timestamp: timestamp,
                content: content,
                likeIds: likeIds,
                comments: comments,
                isRepost: isRepost
            };
            state.push(newPost);
        },
        addRepost: (state, action: PayloadAction<PostType>) => {
            const {profileId, timestamp, content, likeIds, comments, isRepost, originalPostId} = action.payload;
            const newRepost: PostType = {
                postId: state.length,
                profileId: profileId,
                timestamp: timestamp,
                content: content,
                likeIds: likeIds,
                comments: comments,
                isRepost: isRepost,
                originalPostId: originalPostId,
            };
            state.push(newRepost);
        },
        editPostData: (state, action: PayloadAction<EditPostPropType>) => {
            const {postId, editOption, profileId, commentContent, commentId} = action.payload;
            const selectedPost = state.find(post => post.postId === postId);
            if (selectedPost !== undefined) {
                switch (editOption) {
                    case "like":
                        selectedPost.likeIds.push(profileId);
                        break;
                    case "unLike":
                        selectedPost.likeIds.filter(like => like !== profileId);
                        break;
                    case "addComment":
                        if (commentContent !== undefined) {
                            const commentId = selectedPost.comments.length;
                            const newComment: CommentType = {
                                commentId: commentId,
                                profileId: profileId,
                                timestamp: `${new Date()}`,
                                content: commentContent,
                                likeIds: [],
                                replies: []
                            };
                            selectedPost.comments.push(newComment);
                        } else new Error('Comment Content is empty!');
                        break;
                    case "removeComment":
                        if (commentId !== undefined) {
                            selectedPost.comments.filter(comment => comment.commentId !== commentId);
                        } else new Error("Empty Comment Id!")
                        break;
                    default:
                        break;
                }
            } else new Error('Cannot find Post!');
        },
        deletePostData: (state, action: PayloadAction<number>) => {
            const postId = action.payload;
            state.filter(post => post.postId !== postId);
        },
        getPostData: (state) => {
            return state;
        },
    }
});

export const {
    addPost,
    addRepost,
    getPostData,
    editPostData,
    deletePostData,
} = postsDataSlices.actions;

export default postsDataSlices.reducer;