import './postTypeButton.css';
import {PText} from '../../atoms/IndexAtoms';
import {motion} from 'framer-motion';

type Prop = {
    handleCallback: () => void;
    buttonName: string;
    isHover: boolean;
    onMouseOver: () => void;
    onMouseLeave: () => void;
    isSelected: boolean;
};

const PostTypeButton = ({
                            handleCallback,
                            buttonName,
                            isHover,
                            onMouseOver,
                            onMouseLeave,
                            isSelected
                        }: Prop) => {
    return (
        <button
            type="button"
            className="postTypeButton"
            onClick={handleCallback}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            <PText text={buttonName} fontSize={14} fontWeight={600} color="var(--colorBlack)"/>
            {/* TODO: Make the post count in the template component */}
            <PText text="02" fontSize={20} fontWeight={700} color="var(--colorBlack)"/>
            <motion.span
                className="postTypeButton_indicator"
                initial={{opacity: 0, width: 0}}
                animate={{opacity: isHover || isSelected ? 1 : 0, width: isHover || isSelected ? '100%' : 0}}
                transition={{delay: 0.25}}
            />
        </button>
    );
};

export default PostTypeButton;