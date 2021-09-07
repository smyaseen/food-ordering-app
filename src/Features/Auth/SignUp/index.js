import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import FormComponent from '../../../components/FormComponent';
import { signup } from '../actions';

function SignUpForm() {
  const [signUpForm, setSignUpForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const signUpClickHandler = () => {
    dispatch(signup({ name: signUpForm.username, email: signUpForm.email, password: signUpForm.password }));
  };

  const textFiledChangeHandler = (e) => {
    const { value, name } = e.target;

    setSignUpForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const signupInputs = {
    fields: [
      {
        required: true,
        label: 'Email',
        name: 'email',
        type: 'email',
        value: signUpForm?.email || '',
        changeHandler: textFiledChangeHandler,
      },
      {
        required: true,
        label: 'UserName',
        name: 'username',
        type: 'text',
        value: signUpForm?.username || '',
        changeHandler: textFiledChangeHandler,
      },
      {
        required: true,
        label: 'Password',
        name: 'password',
        type: 'password',
        minlength: '6',
        value: signUpForm?.password || '',
        changeHandler: textFiledChangeHandler,
      },
      {
        required: true,
        label: 'Contact No',
        name: 'contact',
        type: 'text',
        value: signUpForm?.contact || '',
        changeHandler: textFiledChangeHandler,
      },
    ],
  };
  const signupButtons = {
    button: [
      {
        type: 'button',
        name: 'SignUp',
        minWidth: '100%',
        clickHandler: signUpClickHandler,
      },
    ],
  };

  return (
    <div>
      <FormComponent
        basicButtons={signupButtons}
        formTitle="Sign UP"
        inputFields={signupInputs}
        label="Back to Login"
        navigationPath="/login"
      />
    </div>
  );
}

export default SignUpForm;
