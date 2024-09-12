import './imageButton.css';
import {Badge} from '../IndexAtoms';
import {ImageButtonType} from "../../../type/type";

const ImageButton = ({
                         isShowBadge,
                         ButtonImage,
                         badgeText,
                         handleCallback,
                         imageButtonStyle,
                         buttonRef
                     }: ImageButtonType) => {
    return <button
        type="button"
        className={imageButtonStyle !== undefined ? `imageButton ${imageButtonStyle}` : 'imageButton'}
        onClick={handleCallback}
        ref={buttonRef}
    >
        {(isShowBadge && badgeText) && <Badge badgeText={badgeText} badgePosition={{x: 5, y: 5}}/>}
        {ButtonImage}
    </button>
}

export default ImageButton;