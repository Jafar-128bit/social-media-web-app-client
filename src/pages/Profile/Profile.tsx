/*
* TODO: When user opens its own profile page it will show "Your Timeline"
*  and if user opens other user's profile page it will show "username Timeline"
*  for Ex. let say user is in the John Carter's profile page it will show "John Carter's Timeline"
*
* TODO: Post containers will have different container size
*  */

import './profile.css';
import {PostTypeSelectorBarTemplate} from "../../template/indexTemplate";
import {HText, PText} from "../../atoms/IndexAtoms";

const Profile = () => {
    return <section className="profile">
        <section className="profile__titleBar">
            <HText
                titleTag={"h1"}
                titleInnerText={"Your Timeline"}
                styleData={{
                    fontWeight: 300,
                    fontSize: 42,
                    color: "var(--colorBlack)"
                }}
                headingStyleName=""
            />
        </section>
        <PostTypeSelectorBarTemplate/>
        <section className="profile__potListContainer">
            <PText
                text="No Post"
                fontSize={22}
                fontWeight={400}
                color="var(--colorGray5)"
            />
        </section>
    </section>
}

export default Profile;