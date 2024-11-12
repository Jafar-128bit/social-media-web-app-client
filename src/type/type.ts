import {JSX, RefObject} from 'react';
import {AxiosRequestConfig} from "axios";

export interface TextPostType {
    text: string;
    fontSize: number;
    fontWeight: number;
}

export interface ReplyTextType extends TextPostType {
    profileName: string;
    color: string;
}

export interface LTextType extends TextPostType {
    color: string;
    width: string,
    height: string,
}

export interface ButtonType {
    handleCallback: () => void;
    buttonName: string;
    buttonType: "submit" | "reset" | "button" | undefined;
    buttonStyle: string;
}

export interface LikeListButtonType extends ButtonType {
    profileName: string;
}

export interface ImageButtonType {
    handleCallback: () => void;
    ButtonImage: JSX.Element;
    isShowBadge: boolean
    badgeText?: string;
    imageButtonStyle?: string;
    buttonRef?: RefObject<HTMLButtonElement>;
    onMouseLeave?: () => void;
    onMouseOver?: () => void;
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

export interface PostTypeSelectorType {
    handleCallback: () => void;
    optionName: string;
    isSelected: boolean;
}

export interface UseApiProps<T> {
    endpoint: string;
    token?: string;
    options?: AxiosRequestConfig;
    defaultData?: T;
}

// Enum to represent notification types
export enum NotificationTypeList {
    LIKE_POST = 'LIKE_POST',
    LIKE_COMMENT = 'LIKE_COMMENT',
    LIKE_REPLY = 'LIKE_REPLY',
    MENTION_POST = 'MENTION_POST',
    MENTION_COMMENT = 'MENTION_COMMENT',
    MENTION_REPLY = 'MENTION_REPLY',
    COMMENTED_ON_POST = 'COMMENTED_ON_POST',
    REPLY_TO_COMMENT = 'REPLY_TO_COMMENT',
}

interface BaseNotification {
    notificationId: string; // Unique ID for each notification
    profileId: string;      // ID of the profile who triggered the notification
    entityId: string;       // ID of the entity (post, comment, reply) involved
    createdAt: Date;        // Timestamp of when the notification was created
    type: NotificationTypeList; // Type of notification from the enum
}

export interface LikeNotification extends BaseNotification {
    type: | NotificationTypeList.LIKE_POST
        | NotificationTypeList.LIKE_COMMENT
        | NotificationTypeList.LIKE_REPLY;
}

export interface MentionNotification extends BaseNotification {
    type: | NotificationTypeList.MENTION_POST
        | NotificationTypeList.MENTION_COMMENT
        | NotificationTypeList.MENTION_REPLY;
}

export interface EntityCreationNotification extends BaseNotification {
    type: | NotificationTypeList.COMMENTED_ON_POST
        | NotificationTypeList.REPLY_TO_COMMENT;
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
    actionArgument: boolean;
    actionState?: any | AddCommentActionStateType | AddRepostActionStateType | undefined;
}

export interface WidgetType {
    isShow: boolean;
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
    /* Profile Id should not be a number it should be a string */
    profileId: string;
    profileName: string;
    username: string;
    password: string;
    profileInfo: {
        profileDescription: string;
        profileLinks: string[];
    };
    profileImage: string | null;
    followers: string[];
    following: string[];
    isPrivate: boolean;
    isActive: boolean;
    isVerified: boolean;
}

export interface FilterProfileDataType {
    profileId: string;
    profileName: string;
    username: string;
    profileInfo: {
        profileDescription: string;
        profileLinks: string[];
    };
    profileImage: string | null;
    followers: number;
    following: number;
    isPrivate: boolean;
    isVerified: boolean;
}

export interface HashtagDataType {
    hashtag_id: number;
    hashtagged_user_id: number | null;
    hashtagged_post_id: number | null;
    hashtag_text: string;
    hashtag_time_stamp: string;
}

export type PostContentType = 'text' | 'image' | 'gif' | 'video';

export interface AttachmentType {
    type: 'image' | 'gif' | 'video';
    url: string;
}

export interface PostType {
    postId: string;
    profileId: string;
    timestamp: string;
    content: string;
    likeIds: string[];
    attachments?: AttachmentType[];
}

export interface FilteredPostData extends PostType{
    profileData: {
        profileImage: string,
        username: string,
    }
}

export interface ReplyType {
    commentId: number;
    profileId: number;
    timestamp: string;
    content: string;
    likeIds: number[];
}

export interface TopLevelCommentType extends ReplyType {
    replies: ReplyType[];
}

export interface Condition {
    check: boolean;
    baseColor: string;
    transitionColor: string
}