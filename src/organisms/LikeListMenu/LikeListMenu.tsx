import './likeListMenu.css';
import React from "react";
import {Button, PText} from "../../atoms/IndexAtoms";

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import {SmallProfileInfo} from "../../molecules/IndexMolecules";
import {LikeListButtonType} from "../../type/type";

const iconStyle = {
    color: 'var(--color2)',
    fontSize: '22px',
};

type Prop = {
    buttonData: LikeListButtonType[];
    likesCount: number;
}

const LikeListMenu = ({buttonData, likesCount}: Prop) => {
    const stopPropagation = (e: React.MouseEvent): void => {
        e.stopPropagation();
    };

    return <div
        className='likeListMenu'
        onClick={stopPropagation}
    >
        <section className="likeListMenu__section_1">
            <PText
                text="Likes"
                fontSize={16}
                fontWeight={500}
                color="var(--colorBlack)"
            />
        </section>
        <section className="likeListMenu__section_2">
            <FavoriteRoundedIcon style={iconStyle}/>
            <PText
                text={likesCount > 10 ? `${likesCount}` : `0${likesCount}`}
                fontSize={16}
                fontWeight={700}
                color='var(--colorBlack)'
            />
        </section>
        <section className="likeListMenu__section_3 noScroll">
            {buttonData.map((value, index) => <div
                key={index}
                className="likeListMenu__section_3_1"
            >
                <SmallProfileInfo profileName={value.profileName}/>
                <Button
                    handleCallback={value.handleCallback}
                    buttonName={value.buttonName}
                    buttonType={value.buttonType}
                    buttonStyle={value.buttonStyle}
                />
            </div>)}
        </section>
    </div>
};

export default LikeListMenu;
