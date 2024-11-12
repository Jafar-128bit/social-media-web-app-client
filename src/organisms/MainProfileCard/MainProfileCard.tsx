import './mainProfileCard.css';
import {ImageButton, LinkText, LText, ProfileImageContainer, PText} from "../../atoms/IndexAtoms";
import {FilterProfileDataType, ImageButtonType} from "../../type/type";
import {motion} from 'framer-motion';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';

type Prop = {
    buttonData: ImageButtonType[];
    isMinimize: boolean;
    filteredProfileData: FilterProfileDataType;
}

const iconStyle = {
    fontSize: '24px',
    transition: "color 0.15s ease-in-out",
}

const MainProfileCard = ({buttonData, isMinimize, filteredProfileData}: Prop) => {
    return <motion.aside
        className="mainProfileCard"
        initial={{left: -400}}
        animate={{left: isMinimize ? -400 : 10}}
        transition={{duration: 0.25, ease: "easeOut"}}
    >
        <ImageButton
            handleCallback={buttonData[1].handleCallback}
            ButtonImage={buttonData[1].ButtonImage}
            isShowBadge={buttonData[1].isShowBadge}
            imageButtonStyle={buttonData[1].imageButtonStyle}
        />
        <section className="mainProfileCard__section1">
            <section className="mainProfileCard__section1_1">
                <ProfileImageContainer styleName="profileMainProfileCard" imageLink={filteredProfileData.profileImage}/>
                <div className="mainProfileCard__section1_1__profileTitleInfo">
                    <PText text={filteredProfileData.profileName} fontSize={16} fontWeight={600}
                           color="var(--colorBlack)"/>
                    <PText text={`${filteredProfileData.followers} followers`} fontSize={14} fontWeight={400}
                           color="var(--colorGray4)"/>
                </div>
            </section>
            <section className="mainProfileCard__section1_2">
                <ImageButton
                    handleCallback={buttonData[0].handleCallback}
                    ButtonImage={buttonData[0].ButtonImage}
                    isShowBadge={buttonData[0].isShowBadge}
                    imageButtonStyle={buttonData[0].imageButtonStyle}
                    onMouseLeave={buttonData[0].onMouseLeave}
                    onMouseOver={buttonData[0].onMouseOver}
                />
            </section>
        </section>
        <div className="mainProfileCard__separator"/>
        <section className="mainProfileCard__section2">
            <section className="mainProfileCard__section2_1">
                <PlaceOutlinedIcon style={iconStyle}/>
                <PText text="location shown here" fontSize={16} fontWeight={500} color="var(--colorGray4)"/>
            </section>
            <section className="mainProfileCard__section2_1">
                <WorkOutlineOutlinedIcon style={iconStyle}/>
                <PText
                    text="user work or academics shown here"
                    fontSize={16}
                    fontWeight={500}
                    color="var(--colorGray4)"
                />
            </section>
        </section>
        <div className="mainProfileCard__separator"/>
        <section className="mainProfileCard__section3">
            <section className="mainProfileCard__section3_1">
                <div className="mainProfileCard__section3_1_1">
                    <PText text="21" fontSize={14} fontWeight={500} color="var(--colorGray4)"/>
                    <PText text="Post" fontSize={16} fontWeight={600} color="var(--colorBlack)"/>
                </div>
                <div className="mainProfileCard__section3_1_1">
                    <PText text={`${filteredProfileData.followers}`} fontSize={14} fontWeight={500}
                           color="var(--colorGray4)"/>
                    <PText text="Followers" fontSize={16} fontWeight={600} color="var(--colorBlack)"/>
                </div>
                <div className="mainProfileCard__section3_1_1">
                    <PText text={`${filteredProfileData.following}`} fontSize={14} fontWeight={500}
                           color="var(--colorGray4)"/>
                    <PText text="Followings" fontSize={16} fontWeight={600} color="var(--colorBlack)"/>
                </div>
            </section>
            <section className="mainProfileCard__section3_2">
                <PText text="Total Profile Visit" fontSize={16} fontWeight={500} color="var(--colorGray4)"/>
                <PText text="231" fontSize={16} fontWeight={700} color="var(--colorBlack)"/>
            </section>
        </section>
        <div className="mainProfileCard__separator"/>
        <section className="mainProfileCard__section4">
            <InfoOutlinedIcon style={{...iconStyle, marginRight: '15px'}}/>
            <LText
                text={filteredProfileData.profileInfo.profileDescription}
                fontSize={14}
                fontWeight={500}
                color="var(--colorGray4)"
                width='calc(100% - 24px - 15px)'
                height='100%'
            />
        </section>
        <div className="mainProfileCard__separator"/>
        <section className="mainProfileCard__section5">
            <section className="mainProfileCard__section5_1">
                <InsertLinkRoundedIcon style={{...iconStyle, marginRight: "10px"}}/>
            </section>
            <section className="mainProfileCard__section5_2">
                {filteredProfileData.profileInfo.profileLinks.map((value: string, index: number) => <section
                        key={index}
                        className="mainProfileCard__section5_2_1"
                    >
                        <PText text={`Link ${index + 1}`} fontSize={16} fontWeight={600} color="var(--colorGray4)"/>
                        <LinkText link={value} fontSize={16} fontWeight={500}/>
                    </section>
                )}
            </section>
        </section>
    </motion.aside>
}

export default MainProfileCard;