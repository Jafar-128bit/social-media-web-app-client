import './signInForm.css';
import {Button} from '../../atoms/IndexAtoms';
import {InputField, ButtonContainer} from '../../molecules/IndexMolecules';
import {ButtonType, SingInFormValues} from "../../../type/type";
import {FormikErrors, FormikTouched} from 'formik';
import React from "react";

type SignInFormProps = {
    values: SingInFormValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleSignUp: () => void;
    handleForget: () => void;
    isSignInLoading: boolean;
    errors: FormikErrors<SingInFormValues>;
    touched: FormikTouched<SingInFormValues>;
    blur: React.FocusEventHandler<HTMLInputElement>;
}

const SignInForm = ({

                        values,
                        touched,
                        errors,
                        blur,
                        handleChange,
                        handleSubmit,
                        handleSignUp,
                        handleForget,
                        isSignInLoading
                    }: SignInFormProps) => {

    const buttonList: ButtonType[] = [
        {
            buttonType: "button",
            buttonStyle: "textButton",
            buttonName: "new user? register here",
            handleCallback: handleSignUp,
        },
        {
            buttonType: "button",
            buttonStyle: "textButton",
            buttonName: "forgot credentials",
            handleCallback: handleForget,
        },
    ];

    return <form className="signInForm" onSubmit={handleSubmit}>
        <section className="signInForm__inputFieldContainer">
            <InputField
                isShowLabel={true}
                labelName="Username"
                labelStyle=""
                inputType="text"
                handleChangeCallback={handleChange}
                placeholder="Enter username"
                htmlFor="username"
                name="username"
                value={values.username}
                onBlur={blur}
                showError={touched.username && errors.username}
                errorMessage={errors.username ? errors.username : ""}
                inputStyleName="signInSignUpForm"
            />
            <InputField
                isShowLabel={true}
                labelName="Password"
                labelStyle=""
                inputType="password"
                handleChangeCallback={handleChange}
                placeholder="Enter password"
                htmlFor="password"
                name="password"
                value={values.password}
                onBlur={blur}
                showError={touched.password && errors.password}
                errorMessage={errors.password ? errors.password : ""}
                inputStyleName="signInSignUpForm"
            />
        </section>
        <Button
            handleCallback={() => {
            }}
            buttonName={isSignInLoading ? "Loading..." : "Sign-In"}
            buttonStyle="signInButton"
            buttonType="submit"
        />
        <ButtonContainer
            buttonList={buttonList}
            buttonContainerStyle="signInButtonContainer"
            buttonType="normalButtons"
        />
    </form>
}

export default SignInForm;