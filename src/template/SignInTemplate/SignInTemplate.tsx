import './signInTemplate.css';

import {FormikHelpers, useFormik} from 'formik';
import * as Yup from 'yup';
import {SignInForm} from '../../organisms/indexOrganisms';
import {useNavigate} from "react-router-dom";
import {apiEndpointMap} from '../../map/apiEndpointMap';

import {ProfileDataType, SingInFormValues} from "../../type/type";
import useAPI from "../../hooks/useAPI";
import {useDispatch} from "react-redux";
import {updateProfileData} from "../../store/slices/authProfileSlice";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(15, 'Username must not be more than 15 characters'),
    password: Yup.string()
        .min(5, 'Password must be at least 8 characters')
        .required('Password is required'),
});
const initialValues: SingInFormValues = {
    username: '',
    password: '',
};

interface ReqData {
    username: string;
    password: string
}

const SignInTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error, response, fetchData} = useAPI<any, ReqData>();

    const handleSubmit = async (
        values: SingInFormValues,
        {setSubmitting}: FormikHelpers<SingInFormValues>
    ) => {
        const fetchMode = process.env.REACT_APP_FETCH_MODE;

        if (fetchMode === 'static') {
            await fetchData(
                '/static/profileData.json',
                'GET'
            );

            if (response) {
                const { profileData } = response as any;
                const verifiedProfileData: ProfileDataType | undefined = profileData
                    .find((profile: ProfileDataType) => profile.username === values.username && profile.password === values.password);
                if (verifiedProfileData) {
                    console.log('Sign-in successful (static mode):');
                    dispatch(updateProfileData({profileData: verifiedProfileData}));
                    navigate('/');
                } else {
                    console.log('Invalid credentials (static mode)');
                }
            } else if (error) {
                console.log(error);
            }
        } else {
            await fetchData(
                apiEndpointMap.signIn,
                'POST',
                {username: values.username, password: values.password}
            );
            if (error) {
                console.log(error);
            } else {
                console.log('Sign-in successful (dynamic mode):', response);
            }
        }

        setSubmitting(false);
    };
    const handleSignUp = () => {
        navigate('/credential/sign-up');
    };
    const handleForgot = () => {

    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return <div className="signInTemplate">
        <section className="signInTitleContainer">
            <p className="signInTitle">Welcome to</p>
            <h1 className="signInMessage">Pulse</h1>
        </section>
        <SignInForm
            handleSubmit={formik.handleSubmit}
            handleChange={formik.handleChange}
            handleSignUp={handleSignUp}
            handleForget={handleForgot}
            isSignInLoading={false}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            blur={formik.handleBlur}
        />
    </div>
}

export default SignInTemplate;