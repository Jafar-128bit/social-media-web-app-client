import "./accountSettingSection.css";
import React from "react";
import {HText} from "../../atoms/IndexAtoms";
import {AccountSectionDataType, AccountSubSectionDataType} from "../../type/type";

type AccountSettingSectionProps = {
    sectionTitle: string;
    subSection: AccountSubSectionDataType[];
}

type AccountSettingSectionData = {
    accountSettingData: AccountSectionDataType[];
}

const accountSettingSubTitleStyleData: {
    fontWeight: number;
    fontSize: number;
    color: string;
} = {
    fontWeight: 500,
    fontSize: 18,
    color: "var(--colorBlack)"
};

const AccountSectionSeparator: React.FunctionComponent<AccountSettingSectionProps> = ({sectionTitle, subSection}) => {
    return <section className="accountSettingSection__sectionTitle">
        <HText
            titleTag={"h4"}
            titleInnerText={sectionTitle}
            styleData={accountSettingSubTitleStyleData}
            headingStyleName={""}
        />
        <div className="accountSettingSection__separator"/>
        <div className="accountSettingSection__subSectionContainer">
            <ul className="accountSettingSection__subSectionListContainer">
                {subSection.map((value, index) =>
                    <li className="accountSettingSection__subSectionListItem">{value.subSectionName}</li>
                )}
            </ul>
        </div>
    </section>
};

const AccountSettingSection: React.FunctionComponent<AccountSettingSectionData> = ({accountSettingData}) => {
    return <div className="accountSettingSection">
        {accountSettingData.map(
            (value: AccountSectionDataType, index: number) => <AccountSectionSeparator
                sectionTitle={value.sectionName}
                subSection={value.subSection}
                key={index}
            />)}
    </div>
}

export default AccountSettingSection;