import './signUpForm.css';
import {InputField, ButtonContainer} from '../../molecules/IndexMolecules';
import {ButtonType, SingUpFormValues} from "../../type/type";
import {FormikErrors, FormikTouched} from 'formik';
import React from "react";

type SignUpFormProps = {
    values: SingUpFormValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleCancel: () => void;
    isSignUpLoading: boolean;
    errors: FormikErrors<SingUpFormValues>;
    touched: FormikTouched<SingUpFormValues>;
    blur: React.FocusEventHandler<HTMLInputElement>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
                                                   values,
                                                   touched,
                                                   errors,
                                                   blur,
                                                   handleChange,
                                                   handleSubmit,
                                                   handleCancel,
                                                   isSignUpLoading
                                               }) => {
    const buttonList: ButtonType[] = [
        {
            buttonType: "button",
            buttonStyle: "textButton",
            buttonName: "Sign-In",
            handleCallback: handleCancel,
        },
        {
            buttonType: "submit",
            buttonStyle: "affirmative",
            buttonName: isSignUpLoading ? "Loading..." : "Sign-Up",
            handleCallback: () => {
            },
        },
    ];

    return <form className="signUpForm" onSubmit={handleSubmit}>
        <section className="signUpForm__inputFieldContainer">
            <InputField
                isShowLabel={true}
                labelName="First Name"
                labelStyle=""
                inputType="text"
                handleChangeCallback={handleChange}
                onBlur={blur}
                placeholder="Enter first name"
                htmlFor="firstName"
                name="firstName"
                value={values.firstName}
                showError={touched.firstName && errors.firstName}
                errorMessage={errors.firstName ? errors.firstName : ""}
                inputStyleName="signInSignUpForm"
            />
            <InputField
                isShowLabel={true}
                labelName="Last Name"
                labelStyle=""
                inputType="text"
                handleChangeCallback={handleChange}
                onBlur={blur}
                placeholder="Enter last name"
                htmlFor="lastName"
                name="lastName"
                value={values.lastName}
                showError={touched.lastName && errors.lastName}
                errorMessage={errors.lastName ? errors.lastName : ""}
                inputStyleName="signInSignUpForm"
            />
            <InputField
                isShowLabel={true}
                labelName="Username"
                labelStyle=""
                inputType="text"
                handleChangeCallback={handleChange}
                onBlur={blur}
                placeholder="Enter username"
                htmlFor="username"
                name="username"
                value={values.username}
                showError={touched.username && errors.username}
                errorMessage={errors.username ? errors.username : ""}
                inputStyleName="signInSignUpForm"
            />
            <InputField
                isShowLabel={true}
                labelName="Email"
                labelStyle=""
                inputType="text"
                handleChangeCallback={handleChange}
                onBlur={blur}
                placeholder="Enter email"
                htmlFor="email"
                name="email"
                value={values.email}
                showError={touched.email && errors.email}
                errorMessage={errors.email ? errors.email : ""}
                inputStyleName="signInSignUpForm"
            />
            <InputField
                isShowLabel={true}
                labelName="Password"
                labelStyle=""
                inputType="password"
                handleChangeCallback={handleChange}
                onBlur={blur}
                placeholder="Enter password"
                htmlFor="password"
                name="password"
                value={values.password}
                showError={touched.password && errors.password}
                errorMessage={errors.password ? errors.password : ""}
                inputStyleName="signInSignUpForm"
            />
            <InputField
                isShowLabel={true}
                labelName="Confirm Password"
                labelStyle=""
                inputType="password"
                handleChangeCallback={handleChange}
                onBlur={blur}
                placeholder="Re-Enter password"
                htmlFor="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                showError={touched.confirmPassword && errors.confirmPassword}
                errorMessage={errors.confirmPassword ? errors.confirmPassword : ""}
                inputStyleName="signInSignUpForm"
            />
        </section>
        <ButtonContainer
            buttonList={buttonList}
            buttonContainerStyle="signUpButtonContainer"
            buttonType="normalButtons"
        />
    </form>
}

export default SignUpForm;