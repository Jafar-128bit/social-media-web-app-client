import "./accountSettingSectionTemplates.css";
import {AccountSettingSection} from "../../organisms/indexOrganisms";
import {AccountSectionDataType} from "../../type/type";
import React from "react";

const AccountSettingSectionTemplates: React.FunctionComponent = () => {
    const accountSectionData: AccountSectionDataType[] = [
        {sectionName: "Basic Setting"},
        {sectionName: "Privacy & Security"},
        {sectionName: "Content & Visibility"},
        {sectionName: "Notifications Settings"},
        {sectionName: "Notifications Settings"},
        {sectionName: "Accessibility"},
        {sectionName: "Data & Account Management"},
    ];

    return <AccountSettingSection accountSettingData={accountSectionData}/>
};

export default AccountSettingSectionTemplates;