import './profileActivityMenu.css';
import {Button, PText} from "../../atoms/IndexAtoms";
import {ButtonType} from "../../type/type";

type Prop = {
    buttonData: ButtonType[];
}

const ProfileActivityMenu = ({buttonData}: Prop) => {
    return <div className="profileActivityMenu">
        <PText
            text="Profile Activities"
            fontSize={18}
            fontWeight={400}
            color="var(--colorBlack)"
        />
        {buttonData.map((value: ButtonType, index: number) => <Button
            key={index}
            handleCallback={value.handleCallback}
            buttonName={value.buttonName}
            buttonType={value.buttonType}
            buttonStyle={value.buttonStyle}
        />)}
    </div>
}

export default ProfileActivityMenu;