import {JSX, RefObject} from 'react';
import {AxiosRequestConfig} from "axios";

export interface ButtonType {
    handleCallback: () => void;
    buttonName: string;
    buttonType: "submit" | "reset" | "button" | undefined;
    buttonStyle: string;
}

export interface ImageButtonType {
    handleCallback: () => void;
    ButtonImage: JSX.Element;
    isShowBadge: boolean
    badgeText?: string;
    imageButtonStyle?: string;
    buttonRef?: RefObject<HTMLButtonElement>;
}

export interface SingInFormValues {
    username: string;
    password: string;
}

export interface SingUpFormValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UseApiProps<T> {
    endpoint: string;
    token?: string;
    options?: AxiosRequestConfig;
    defaultData?: T;
}

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

export interface GifAttachmentType {
    gif: GifFileType;
    altText: string;
}

export interface PostMenuData {
    title: string;
    type: "normal" | "alert";
    action: ((actionType: string) => void) | null;
}

export interface HashtagWithCounts {
    hashtag_text: string;
    hashtag_useCounts: number;
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

export interface PostType {
    postId?: number;
    profileId: number;
    timestamp: string;
    content: string;
    likeIds: number[];
    comments: TopLevelCommentType[];
    isRepost: boolean;
    originalPostId?: number;
    attachments?: AttachmentType[];
}

export interface AttachmentType {
    attachmentId: number;
    type: 'image' | 'gif' | 'video';
    url: string;
}

export interface CommentType {
    commentId: number;
    profileId: number;
    timestamp: string;
    content: string;
    likeIds: number[];
}

export interface TopLevelCommentType extends CommentType {
    replies: CommentType[];
}
