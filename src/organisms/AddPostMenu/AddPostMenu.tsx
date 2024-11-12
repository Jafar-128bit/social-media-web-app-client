import './addPostMenu.css';
import {Button, ProfileImageContainer, Textarea} from "../../atoms/IndexAtoms";
import {ImageButtonType} from "../../type/type";
import {ButtonContainer} from "../../molecules/IndexMolecules";

type Prop = {
    buttonData: ImageButtonType[];
}

const AddPostMenu = ({buttonData}: Prop) => {
    return <div className="addPostMenu">
        <section className="addPostMenu__upperSection">
            <ProfileImageContainer styleName="profileAddPostMenu"/>
            <Textarea
                name="addPostTextarea"
                placeholder="Whats in your mind..."
                value=""
                handleChange={() => {
                }}
                styleName="textareaAddPostMenu"
            />
        </section>
        <section className="addPostMenu__lowerSection">
            <ButtonContainer
                buttonList={buttonData}
                buttonContainerStyle="addPostMenuButtonContainer"
                buttonType="imageButtons"
            />
            <Button
                handleCallback={() =>{}}
                buttonName="Post"
                buttonType="button"
                buttonStyle="postButton"
            />
        </section>
    </div>
}

export default AddPostMenu;