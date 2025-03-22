import {ButtonType, FilteredPostData, ImageButtonType, PostContentType} from "../../type/type";

import React, {useEffect, useMemo, useState, Suspense} from "react";
import useHover from "../../hooks/useHover";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

/* Like Icon */
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
/* Comment Icon */
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
/* Share Icon */
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
/* Save Icon */
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';
import TurnedInRoundedIcon from '@mui/icons-material/TurnedInRounded';
import {determinePostType} from "../../utils/utils";
import {togglePopUp} from "../../store/slices/popUpSlices";
import {useDispatch} from "react-redux";

const PostContainer = React.lazy(() =>
    import('../../organisms/indexOrganisms').then((module) => ({
        default: module.PostContainer,
    }))
);

const iconStyle = {
    fontSize: '22px',
    transition: "color 0.15s ease-in-out"
};

type Prop = {
    postData: FilteredPostData;
}

const PostContainerTemplate = ({postData}: Prop) => {
    const dispatch = useDispatch();

    /* TODO: Temp state, this will be replaced by an API Call */
    const [isLike, setIsLike] = useState<boolean>(true);
    const [isSave, setIsSave] = useState<boolean>(true);
    const [postType, setPostType] = useState<PostContentType>('text');

    useEffect(() => {
        setPostType(determinePostType(postData));
    }, [postData]);

    const {hoverData, handleHover, getButtonColor} = useHover(6);

    const handleLike = (): void => {
        setIsLike(!isLike);
    };
    const handleSave = (): void => {
        setIsSave(!isSave);
    };
    const handleAddCommentMenu = (): void => {
        dispatch(togglePopUp({actionName: "popUpContainer", actionArgument: true}));
        dispatch(togglePopUp({actionName: "addCommentMenu", actionArgument: true, actionState: postData.postId}));
    }
    const handleLikeMenu = (): void => {
        dispatch(togglePopUp({actionName: "popUpContainer", actionArgument: true}));
        dispatch(togglePopUp({actionName: "likedListMenu", actionArgument: true, actionState: postData.postId}));
    }
    const handleCommentListMenu = (): void => {
        dispatch(togglePopUp({actionName: "popUpContainer", actionArgument: true}));
        dispatch(togglePopUp({actionName: "commentListMenu", actionArgument: true, actionState: postData.postId}));
    }

    const normalButtonMap: Record<string, ButtonType> = {
        followButton: {
            handleCallback: () => {
            },
            buttonName: "Follow",
            buttonType: "button",
            buttonStyle: "postContainerFollowButton"
        },
        showMoreButton: {
            handleCallback: () => {
            },
            buttonName: "...show more",
            buttonType: "button",
            buttonStyle: "textButton"
        },
        likeCountButton: {
            handleCallback: handleLikeMenu,
            buttonName: `${postData.likeIds.length} ${postData.likeIds.length > 1 ? 'likes' : 'like'}`,
            buttonType: "button",
            buttonStyle: "textButton"
        },
        viewAllButton: {
            handleCallback: handleCommentListMenu,
            buttonName: "view all comments",
            buttonType: "button",
            buttonStyle: "textButton"
        },
    };
    const postMenuButton: ImageButtonType = {
        ButtonImage: <MoreHorizIcon style={{
            ...iconStyle,
            color: getButtonColor([
                {
                    check: hoverData.button1,
                    baseColor: "var(--colorGray3)",
                    transitionColor: "var(--colorBlack)",
                },
            ]),
        }}/>,
        handleCallback: () => {
        },
        imageButtonStyle: "postContainerBtnStyle",
        isShowBadge: false,
        onMouseOver: () => handleHover('button1', true),
        onMouseLeave: () => handleHover('button1', false)
    };
    const postActionButton: ImageButtonType[] = useMemo((): ImageButtonType[] => [
        {
            ButtonImage: isLike ? <FavoriteBorderRoundedIcon
                    style={{
                        ...iconStyle,
                        color: getButtonColor([
                            {
                                check: hoverData.button2,
                                baseColor: "var(--colorGray5)",
                                transitionColor: "var(--colorGray2)",
                            },
                        ]),
                    }}/>
                : <FavoriteRoundedIcon
                    style={{
                        ...iconStyle,
                        color: "var(--color2)",
                    }}/>,
            handleCallback: handleLike,
            imageButtonStyle: "postContainerBtnStyle",
            isShowBadge: false,
            onMouseOver: () => handleHover('button2', true),
            onMouseLeave: () => handleHover('button2', false)
        },
        {
            ButtonImage: <ChatBubbleOutlineRoundedIcon style={{
                ...iconStyle,
                color: getButtonColor([
                    {
                        check: hoverData.button3,
                        baseColor: "var(--colorGray5)",
                        transitionColor: "var(--colorGray2)",
                    },
                ]),
            }}/>,
            handleCallback: handleAddCommentMenu,
            imageButtonStyle: "postContainerBtnStyle",
            isShowBadge: false,
            onMouseOver: () => handleHover('button3', true),
            onMouseLeave: () => handleHover('button3', false)
        },
        {
            ButtonImage: <ShareRoundedIcon style={{
                ...iconStyle,
                color: getButtonColor([
                    {
                        check: hoverData.button4,
                        baseColor: "var(--colorGray5)",
                        transitionColor: "var(--colorGray2)",
                    },
                ]),
            }}/>,
            handleCallback: () => {
            },
            imageButtonStyle: "postContainerBtnStyle",
            isShowBadge: false,
            onMouseOver: () => handleHover('button4', true),
            onMouseLeave: () => handleHover('button4', false)
        },
    ], [hoverData, isLike]);
    const saveButton: ImageButtonType = {
        ButtonImage: isSave ? <TurnedInNotRoundedIcon
                style={{
                    ...iconStyle,
                    color: getButtonColor([
                        {
                            check: hoverData.button5,
                            baseColor: "var(--colorGray5)",
                            transitionColor: "var(--colorGray2)",
                        },
                    ]),
                }}/>
            : <TurnedInRoundedIcon
                style={{
                    ...iconStyle,
                    color: "var(--colorBlack)",
                }}/>,
        handleCallback: handleSave,
        imageButtonStyle: "postContainerBtnStyle",
        isShowBadge: false,
        onMouseOver: () => handleHover('button5', true),
        onMouseLeave: () => handleHover('button5', false)
    };

    return <>
        <Suspense fallback={<div>Loading...</div>}>
            <PostContainer
                normalButtonMap={normalButtonMap}
                postMenuButton={postMenuButton}
                postActionButton={postActionButton}
                saveButton={saveButton}
                postType={postType}
                postData={postData}
            />
        </Suspense>
    </>
};

export default PostContainerTemplate;
