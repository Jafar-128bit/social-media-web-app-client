import {JSX} from 'react';

export interface NavbarOptionDataType {
    navName: string;
    icon: JSX.Element;
    url: string | null;
    type: "url" | "button";
}

export interface NavbarMenuOptionDataType {
    menuName: string;
    actionName: "openThemeMenu" | "gotoSettings" | "gotoSaved" | "gotoYourLikes" | "openReportMenu" | "logOutAction";
}

export interface AddCommentActionStateType {
    postId: number;
    profileId: number;
}

export interface AddRepostActionStateType {
    postId: number;
    originalPostId: number;
}

export interface PopUpType {
    actionName: string;
    actionArgument: boolean;
    actionState?: any | AddCommentActionStateType | AddRepostActionStateType | undefined;
}

export interface Attachment {
    src: string;
    alt?: string;
}

export interface AttachmentsType {
    postComment: string;
    files: {
        [key: string]: Attachment
    };
}

export interface GifFileType {
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface GifAttachmentType {
    gif: GifFileType;
    altText: string;
}

export interface PostMenuData {
    title: string;
    type: "normal" | "alert";
    action: ((actionType: string) => void) | null;
}

export interface ProfileDataType {
    profileId: number;
    profileName: string;
    username: string;
    profileInfo: {
        profileDescription: string;
        profileLinks: string[];
    };
    profileImage: any | null;
    followers: number[];
    following: number[];
    isPrivate: boolean;
    isActive: boolean;
    isVerified: boolean;
}

export interface HashtagDataType {
    hashtag_id: number;
    hashtagged_user_id: number | null;
    hashtagged_post_id: number | null;
    hashtag_text: string;
    hashtag_time_stamp: string;
}

export interface HashtagWithCounts {
    hashtag_text: string;
    hashtag_useCounts: number;
}

export interface PostType {
    postId?: number;
    profileId: number;
    timestamp: string;
    content: string;
    likeIds: number[];
    comments: CommentType[];
    isRepost: boolean;
    originalPostId?: number;
}

export interface CommentType {
    commentId: number;
    profileId: number;
    timestamp: string;
    content: string;
    likeIds: number[];
    replies?: CommentType[];
}