import './credential.css';

import {SignInTemplate, SignUpTemplate} from '../../components/template/indexTemplate';

type PropCredential = {
    type: "sign-in" | "sign-up"
}

const Credential = ({type}: PropCredential) => {
    return <section className="credential noScroll">
        {type === "sign-in" && <SignInTemplate/>}
        {type === "sign-up" && <SignUpTemplate/>}
    </section>
}

export default Credential;