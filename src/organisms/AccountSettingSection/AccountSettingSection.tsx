import "./accountSettingSection.css";
import React from "react";
import {HText} from "../../atoms/IndexAtoms";
import {AccountSectionDataType} from "../../type/type";

type AccountSettingSectionProps = {
    sectionTitle: string;
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

const AccountSectionSeparator: React.FunctionComponent<AccountSettingSectionProps> = ({sectionTitle}) => {
    return <section className="accountSettingSection__sectionTitle">
        <HText
            titleTag={"h4"}
            titleInnerText={sectionTitle}
            styleData={accountSettingSubTitleStyleData}
            headingStyleName={""}
        />
        <div className="accountSettingSection__separator"/>
    </section>
};

const AccountSettingSection: React.FunctionComponent<AccountSettingSectionData> = ({accountSettingData}) => {
    return <div className="accountSettingSection">
        {accountSettingData.map(
            (value: AccountSectionDataType, index: number) => <AccountSectionSeparator
                sectionTitle={value.sectionName}
                key={index}
            />)}
    </div>
}

export default AccountSettingSection;