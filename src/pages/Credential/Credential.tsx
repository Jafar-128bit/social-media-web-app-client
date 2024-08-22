import './credential.css';
import defaultProfilePicture from '../../assets/profileImages/defaultProfile.png';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';

import {ChangeEvent, useState} from "react";
import {SunspotLoaderComponent} from "../../components/LoaderComponent/LoaderComponent";
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {updateProfileInfo} from "../../store/slices/profileInfoSlice";
import {profileData} from "../../data/data";

type PropCredential = {
    type: "sign-in" | "sign-up"
}

type SignUpData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{ message: string, status: boolean }>({message: "", status: false});
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSetUsername = (e: ChangeEvent<HTMLInputElement>): void => setUsername(e.target.value);
    const handleSetPassword = (e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value);
    const handleSubmit = (): void => {
        // Check if either username or password is empty
        if (username.length === 0 || password.length === 0) {
            setError({message: "Empty User Input!", status: true});
            setTimeout(() => setError({message: "", status: false}), 2000);
            return;
        }

        setLoading(true);

        // Simulate an authentication process
        new Promise((resolve, reject) => {
            const isPassword: boolean = password === "12345";
            setTimeout(() => {
                if (isPassword) {
                    resolve('Success');
                } else {
                    reject('Password Incorrect!');
                }
            }, 3000);
        })
            .then((message) => {
                setError({message: "", status: false});
                setLoading(false);

                // Find profile by username
                const findProfile = profileData.find(profile => profile.username === username);
                if (!findProfile) {
                    setError({message: "Wrong Username!", status: true});
                    setTimeout(() => setError({message: "", status: false}), 2000);
                    return;  // Exit after setting the error
                }

                // Update profile info and navigate to the home page
                dispatch(updateProfileInfo(findProfile.profileId));
                navigate('/');
            })
            .catch((error) => {
                setError({message: error, status: true});
                setTimeout(() => setError({message: "", status: false}), 4000);
                setLoading(false);
            });
    };

    const handleRegister = (): void => navigate('/credential/sign-up');

    return <div className="credential__signInContainer">
        <section className="credential__signInTitleContainer">
            <p className="credential__signInTitleWelcome">Welcome to</p>
            <h1 className="credential__signInTitleMessage">Pulse</h1>
        </section>
        <section className="credential__signInInputContainer">
            <input
                className="credential__signInInputBox"
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleSetUsername}
            />
            <input
                className="credential__signInInputBox"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleSetPassword}
            />
        </section>
        <section className="credential__signInSubmitContainer">
            <button
                type="button"
                className={`credential__submitBtn ${loading ? "borderRadius1" : "borderRadius2"}`}
                onClick={handleSubmit}
            >
                {error.status ?
                    <p className="credential__submitBtnTitle">
                        {error.message}
                        <GppMaybeRoundedIcon
                            style={{
                                color: "var(--colorWhite)",
                                fontSize: "22px",
                                margin: "0 0 0 5px"
                            }}
                        />
                    </p> :
                    <p className="credential__submitBtnTitle">{loading ? "Loading" : "Sign-In"}</p>
                }
                <span className={`credential__loadingAnimationContainer ${loading ? "showLoading" : "hideLoading"}`}>
                    <SunspotLoaderComponent/>
                </span>
                <motion.div
                    className="credential__submitBtnBackground"
                    style={{background: error.status ? "var(--color2)" : "var(--background1)"}}
                    initial={{x: 0, opacity: 1}}
                    animate={{x: loading ? -300 : 0, opacity: loading ? 0 : 1}}
                    transition={{duration: 0.75,}}
                />
                <motion.div
                    className="credential__submitBtnBackground"
                    style={{background: "var(--colorBlack)"}}
                    initial={{x: 300, opacity: 0}}
                    animate={{x: loading ? 0 : 300, opacity: loading ? 1 : 0}}
                    transition={{duration: 0.75,}}
                />
            </button>
        </section>
        <section className="credential__signInActionContainer">
            <button
                type="button"
                className="credential__signInInputTrouble"
                onClick={handleRegister}
            >
                New? Register Now!
            </button>
            <button
                type="button"
                className="credential__signInInputTrouble"
            >
                forgot your credentials?
            </button>
        </section>
    </div>
}
const SignUp = () => {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState<SignUpData>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignUpData = (event: ChangeEvent<HTMLInputElement>, flag: 0 | 1 | 2 | 3 | 4): void => {

        const updateState = (targetProperty: keyof SignUpData, targetData: string): void => {
            setSignUpData(prevState => ({
                ...prevState,
                [targetProperty]: targetData
            }));
        }

        switch (flag) {
            case 0:
                updateState("firstName", event.target.value);
                break;
            case 1:
                updateState("lastName", event.target.value);
                break;
            case 2:
                updateState("username", event.target.value);
                break;
            case 3:
                updateState("email", event.target.value);
                break;
            case 4:
                updateState("password", event.target.value);
                break;
            default:
                break;
        }
    };
    const handleSubmitSignUp = (): void => {
        setLoading(true);
        setTimeout(() => setLoading(false), 3000);
    }
    const handleCancel = (): void => navigate('/credential/sign-in');

    return <div className="credential__signUpContainer">
        <section className="credential__signUpTitleContainer">
            <h1 className="credential__signUpMessage">Sign-Up</h1>
            <p className="credential__signUpTitle">And Join Pulse!</p>
        </section>
        <section className="credential__signUpForm1">
            <div className="credential__signUpImageContainer">
                <img src={defaultProfilePicture} alt="profilePicture" height="100px"/>
            </div>
            <div className="credential__signUpNameInputContainer">
                <input
                    type="text"
                    className="credential__signUpNameInput"
                    placeholder="First Name"
                    value={signUpData.firstName}
                    onChange={e => handleSignUpData(e, 0)}
                />
                <input
                    type="text"
                    className="credential__signUpNameInput"
                    placeholder="Last Name"
                    value={signUpData.lastName}
                    onChange={e => handleSignUpData(e, 1)}
                />
                <input
                    type="text"
                    className="credential__signUpNameInput"
                    placeholder="Username"
                    value={signUpData.username}
                    onChange={e => handleSignUpData(e, 2)}
                />
            </div>
        </section>
        <section className="credential__signUpForm2">
            <input type="email" className="credential__signUpInfoInput" placeholder="Email"/>
            <input type="password" className="credential__signUpInfoInput" placeholder="Password"/>
            <input type="password" className="credential__signUpInfoInput" placeholder="Confirm Password"/>
            <p className="credential__signUpPasswordInfo">
                Password must be at least 8 characters long and include:
                <ul className="credential__signUpPasswordInfoPoints">
                    <li>One special character</li>
                    <li>One number</li>
                    <li>One uppercase letter</li>
                </ul>
            </p>

        </section>
        <section className="credential__signUpSubmitContainer">
            <button
                type="button"
                className="credential__signUpSubmitActionBtn cancelBtn"
                onClick={handleCancel}
            >
                Sign-In
            </button>
            <button
                type="button"
                className="credential__signUpSubmitActionBtn submitBtn"
                onClick={handleSubmitSignUp}
            >
                {loading ? "Loading" : "Sign-In"}
                <span className={`credential__loadingAnimationContainer ${loading ? "showLoading" : "hideLoading"}`}>
                    <SunspotLoaderComponent/>
                </span>
            </button>
        </section>
    </div>
}

const Credential = ({type}: PropCredential) => {
    return <section className="credential noScroll">
        {type === "sign-in" && <SignIn/>}
        {type === "sign-up" && <SignUp/>}
    </section>
}

export default Credential;