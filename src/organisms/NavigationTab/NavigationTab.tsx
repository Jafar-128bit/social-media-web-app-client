import './navigationTab.css';
import {ImageButtonType} from "../../type/type";
import {SearchInput, ButtonContainer} from '../../molecules/IndexMolecules'

type Prop = {
    navigationMenuButtonData: ImageButtonType[];
    navigationEssentialButton: ImageButtonType[];
};

const NavigationTab = ({navigationMenuButtonData, navigationEssentialButton}: Prop) => {

    return <div className="navigationTab">
        <span className="navigationTab__buttonContainer">
            <ButtonContainer
                buttonList={navigationEssentialButton}
                buttonContainerStyle="navigationButtonContainer"
                buttonType="imageButtons"
            />
        </span>
        <SearchInput/>
        <span className="navigationTab__buttonContainer">
            <ButtonContainer
                buttonList={navigationMenuButtonData}
                buttonContainerStyle="navigationButtonContainer"
                buttonType="imageButtons"
            />
        </span>
    </div>
}

export default NavigationTab;