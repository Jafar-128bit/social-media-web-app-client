import "./accountSettingSection.css";
import React from "react";
import {HText} from "../../atoms/IndexAtoms";

type AccountSettingSectionProps = {
    sectionTitle: string;
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

const AccountSettingSection: React.FunctionComponent = () => {
    return <div className="accountSettingSection">
        <AccountSectionSeparator sectionTitle={"Basic Settings"} />
    </div>
}

export default AccountSettingSection;