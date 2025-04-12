import "./accountSetting.css";
import {HText} from "../../atoms/IndexAtoms";
import {AccountSettingSectionTemplates} from "../../template/indexTemplate";

const accountSettingTitleStyleData: {
    fontWeight: number;
    fontSize: number;
    color: string;
} = {
    fontWeight: 700,
    fontSize: 34,
    color: "var(--colorBlack)"
};

const accountSettingSubTitleStyleData: {
    fontWeight: number;
    fontSize: number;
    color: string;
} = {
    fontWeight: 400,
    fontSize: 24,
    color: "var(--colorBlack)"
};

const AccountSetting = () => {
    return <section className="accountSettingPage">
        <div className="accountSettingPage__titleContainer">
            <HText
                titleTag={"h3"}
                titleInnerText={"Welcome to"}
                styleData={accountSettingSubTitleStyleData}
                headingStyleName={""}
            />
            <HText
                titleTag={"h1"}
                titleInnerText={"Account Center"}
                styleData={accountSettingTitleStyleData}
                headingStyleName={""}
            /> {/* TODO: MAke this text with gradient effect and add animation to it */}
        </div>
        <AccountSettingSectionTemplates/>
    </section>
}

export default AccountSetting;