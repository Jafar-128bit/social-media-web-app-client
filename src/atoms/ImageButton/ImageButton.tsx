import './imageButton.css';
import {Badge} from '../IndexAtoms';
import {ImageButtonType} from "../../type/type";

const ImageButton = ({
                         isShowBadge,
                         ButtonImage,
                         badgeText,
                         handleCallback,
                         imageButtonStyle,
                         buttonRef,
                         onMouseLeave,
                         onMouseOver
                     }: ImageButtonType) => {
    return <button
        type="button"
        className={imageButtonStyle !== undefined ? `imageButton ${imageButtonStyle}` : 'imageButton'}
        onClick={handleCallback}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        ref={buttonRef}
    >
        {(isShowBadge && badgeText) && <Badge badgeText={badgeText} badgePosition={{x: 5, y: 5}}/>}
        {ButtonImage}
    </button>
}

export default ImageButton;