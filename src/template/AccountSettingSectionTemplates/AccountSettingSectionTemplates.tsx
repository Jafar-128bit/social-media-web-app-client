import "./accountSettingSectionTemplates.css";
import {AccountSettingSection} from "../../organisms/indexOrganisms";
import {AccountSectionDataType} from "../../type/type";
import React from "react";

const AccountSettingSectionTemplates: React.FunctionComponent = () => {
    const accountSectionData: AccountSectionDataType[] = [
        {
            sectionName: "Basic Setting",
            subSection: [
                {subSectionName: "Profile Edit"},
                {subSectionName: "Change Password"},
                {subSectionName: "Email and Phone Number"},
            ]
        },
        {
            sectionName: "Privacy & Security",
            subSection: [
                {subSectionName: "Two Factor Authentication(2FA)"},
                {subSectionName: "Session Management"},
                {subSectionName: "Login Alerts"},
                {subSectionName: "Blocked Account"},
            ]
        },
        {
            sectionName: "Content & Visibility",
            subSection: [
                {subSectionName: "Account Privacy"},
                {subSectionName: "Activity Status"},
                {subSectionName: "Tagging Controls"},
                {subSectionName: "Post Visibility Settings"},
            ]
        },
        {
            sectionName: "Notifications Settings",
            subSection: [
                {subSectionName: "Email and Push Notifications"},
                {subSectionName: "Digest Email Toggle"},
            ]
        },
        {
            sectionName: "Accessibility",
            subSection: [
                {subSectionName: "Dark mode Toggle"},
                {subSectionName: "Font Size"},
                {subSectionName: "High Contrast Mode"},
            ]
        },
        {
            sectionName: "Data & Account Management",
            subSection: [
                {subSectionName: "Download My Data"},
                {subSectionName: "Deactivate or Delete Account"},
            ]
        },
    ];

    return <AccountSettingSection accountSettingData={accountSectionData}/>
};

export default AccountSettingSectionTemplates;