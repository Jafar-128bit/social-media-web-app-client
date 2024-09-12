import './buttonContainer.css';
import {Button, ImageButton} from '../../atoms/IndexAtoms';
import {ButtonType, ImageButtonType} from "../../../type/type";

type Prop = {
    buttonList: ButtonType[] | ImageButtonType[];
    buttonContainerStyle: string;
    buttonType: "imageButtons" | "normalButtons";
}

const ButtonContainer = ({buttonList, buttonContainerStyle, buttonType}: Prop) => {
    return (
        <div className={`buttonContainer ${buttonContainerStyle}`}>
            {buttonList.map((value: ButtonType | ImageButtonType, index: number) =>
                buttonType === "imageButtons" ? (
                    <ImageButton
                        key={index}
                        isShowBadge={"isShowBadge" in value ? value.isShowBadge : false}
                        handleCallback={value.handleCallback}
                        badgeText={"badgeText" in value ? value.badgeText : ""}
                        ButtonImage={"ButtonImage" in value ? value.ButtonImage : <></>}
                        imageButtonStyle={"imageButtonStyle" in value ? value.imageButtonStyle : ""}
                        buttonRef={"buttonRef" in value ? value.buttonRef : undefined}
                    />
                ) : (
                    <Button
                        key={index}
                        handleCallback={value.handleCallback}
                        buttonName={"buttonName" in value ? value.buttonName : ""}
                        buttonType={"buttonType" in value ? value.buttonType : "button"}
                        buttonStyle={"buttonStyle" in value ? value.buttonStyle : ""}
                    />
                )
            )}
        </div>
    );
}

export default ButtonContainer;
