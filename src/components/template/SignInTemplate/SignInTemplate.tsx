import './signInTemplate.css';

import {FormikHelpers, useFormik} from 'formik';
import * as Yup from 'yup';
import {SignInForm} from '../../organisms/indexOrganisms';
import {useNavigate} from "react-router-dom";
import {apiEndpointMap} from '../../../map/apiEndpointMap';

import {SingInFormValues} from "../../../type/type";
import useAPI from "../../../hooks/useAPI";

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
    // const {loading, error, response, fetchData} = useAPI<any, ReqData>();

    const handleSubmit = async (values: SingInFormValues, {setSubmitting}: FormikHelpers<SingInFormValues>) => {
        // await fetchData(
        //     apiEndpointMap.signIn,
        //     'POST',
        //     {username: values.username, password: values.password},
        // );
        // if (error) {
        //     console.log(error)
        // } else {
        //     console.log(response);
        // }
        setSubmitting(false);
    };
    const handleSignUp = () => {
        navigate('/credential/sign-up')
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