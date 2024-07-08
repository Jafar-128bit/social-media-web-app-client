import {JSX} from 'react';

export interface NavbarOptionDataType {
    icon: JSX.Element;
    url: string | null;
    type: "url" | "button";
}

export interface NavbarMenuOptionDataType {
    menuName: string;
    actionName: "openThemeMenu" | "gotoSettings" | "gotoSaved" | "gotoYourLikes" | "openReportMenu" | "logOutAction";
}

interface AltTextMenuOptionsType {
    isOpen: boolean;
    fileId: string;
}

export interface PopUpMenuType {
    popUpMenuContainer: boolean;
    profilePreviewMenu: boolean;
    addNewPostMenu: boolean;
    addCommentOnPostMenu: boolean;
    addCommentOnCommentMenu: boolean;
    addAltTextMenu: AltTextMenuOptionsType;
    addGifMenu: boolean;
    repostWithQuoteMenu: boolean;
    reportProblemMenu: boolean;
    reportPostMenu: boolean;
    blockProfileMenu: boolean;
    editCommentMenu: boolean;
    editProfileMenu: boolean;
    editNameMenu: boolean;
    editDescriptionMenu: boolean;
    editLinkMenu: boolean;
    showProfilePictureMenu: boolean;
    deletePostMenu: boolean;
    deleteCommentMenu: boolean;
    whoCanReplyMenu: boolean;
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

export interface PostDataType {
    postId: number;
    profileId: number;
    postTextContent: string;
    isAttachmentContain: boolean;
    postTime: string;
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