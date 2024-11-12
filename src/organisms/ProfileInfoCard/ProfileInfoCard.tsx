import './profileInfoCard.css';
import {Button, LinkText, LText, ProfileImageContainer, PText} from "../../atoms/IndexAtoms";
import {TransparentGradientScreenTemplate} from "../../template/indexTemplate";
import {FilterProfileDataType} from "../../type/type";

type Prop = {
    filteredProfileData: FilterProfileDataType;
}

const ProfileInfoCard = ({filteredProfileData}: Prop) => {
    return <aside className="profileInfoCard noScroll">
        <TransparentGradientScreenTemplate
            gradientLength={70}
            mainColorRGB="rgb(255, 255, 255)"
            mainColorTransparentValue={95}
        />
        <section className="profileInfoCard__section1">
            <ProfileImageContainer
                styleName="profileInfoCardPicture"
                imageLink={filteredProfileData.profileImage}
            />
        </section>
        <section className="profileInfoCard__section2">
            <PText
                text={filteredProfileData.profileName}
                fontSize={26}
                fontWeight={500}
                color="var(--colorBlack)"
            />
            <section className="profileInfoCard__section2-1">
                <LText
                    color="var(--colorBlack)"
                    width="100%"
                    height="100%"
                    text={filteredProfileData.profileInfo.profileDescription}
                    fontSize={16}
                    fontWeight={400}
                />
            </section>
            <section className="profileInfoCard__section2-2">
                <section className="profileInfoCard__section2-2-1">
                    {/* TODO: Make this a button instead of PText */}
                    <PText
                        text="Followers"
                        fontSize={18}
                        fontWeight={400}
                        color="var(--colorBlack)"
                    />
                    <PText
                        text={`${filteredProfileData.followers}`}
                        fontSize={16}
                        fontWeight={700}
                        color="var(--colorBlack)"
                    />
                </section>
                <section className="profileInfoCard__section2-2-2">
                    {/* TODO: Make this a button instead of PText */}
                    <PText
                        text="Followings"
                        fontSize={18}
                        fontWeight={400}
                        color="var(--colorBlack)"
                    />
                    <PText
                        text={`${filteredProfileData.following}`}
                        fontSize={16}
                        fontWeight={700}
                        color="var(--colorBlack)"
                    />
                </section>
            </section>
            <section className="profileInfoCard__section2-3">
                {filteredProfileData.profileInfo.profileLinks.map((value: string, index: number) => <LinkText
                    key={index}
                    link={value}
                    fontSize={14}
                    fontWeight={600}
                />)}
            </section>
        </section>
        <section className="profileInfoCard__section3">
            <Button
                handleCallback={() => {
                }}
                buttonName="Follow"
                buttonType="button"
                buttonStyle="followButtonProfileCard"
            />
            <Button
                handleCallback={() => {
                }}
                buttonName="Message"
                buttonType="button"
                buttonStyle="messageButtonProfileCard"
            />
        </section>
    </aside>
}

export default ProfileInfoCard;