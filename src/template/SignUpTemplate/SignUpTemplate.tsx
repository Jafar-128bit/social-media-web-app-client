import './signUpTemplate.css';

import {FormikHelpers, useFormik} from 'formik';
import * as Yup from 'yup';
import {SingUpFormValues} from "../../type/type";
import {SignUpForm} from '../../organisms/indexOrganisms';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name must be at least 2 characters')
        .max(15, 'First Name must not be more than 15 characters'),
    lastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters')
        .max(15, 'Last Name must not be more than 15 characters'),
    username: Yup.string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(15, 'Username must not be more than 15 characters'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});
const initialValues: SingUpFormValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpTemplate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const handleCancel = (): void => navigate('/credential/sign-in');
    const handleSubmit = (values: SingUpFormValues, {setSubmitting}: FormikHelpers<SingUpFormValues>) => {
        setLoading(true);
        alert(JSON.stringify(values, null, 2));
        console.log('Form Submitted:', values);
        setSubmitting(false);
        setLoading(false);
    };
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return <div className="signUpTemplate">
        <section className="signUpTemplate__signUpTitleContainer">
            <h1 className="signUpTemplate__signUpMessage">Sign-Up</h1>
            <p className="signUpTemplate__signUpTitle">And Join Pulse!</p>
        </section>
        <SignUpForm
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            blur={formik.handleBlur}
            handleChange={formik.handleChange}
            handleSubmit={formik.handleSubmit}
            handleCancel={handleCancel}
            isSignUpLoading={loading}
        />
    </div>
}

export default SignUpTemplate