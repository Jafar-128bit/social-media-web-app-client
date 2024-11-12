import './smallProfileInfo.css';
import {ProfileImageContainer, PText} from "../../atoms/IndexAtoms";

type Prop = {
    profileName: string;
}

const SmallProfileInfo = ({profileName}: Prop) => {
    return <div className='smallProfileInfo'>
        <ProfileImageContainer styleName='smallProfileInfoContainer'/>
        <PText
            text={profileName}
            fontSize={14}
            fontWeight={500}
            color='var(--colorGray4)'
        />
    </div>
};

export default SmallProfileInfo;
