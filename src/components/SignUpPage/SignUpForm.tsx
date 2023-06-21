import React, { useState } from 'react';
import * as Styled from './SignUpPage.styled';
import { useNavigate } from 'react-router-dom';
import * as Api from 'apis/auth';
import EmailInput from 'components/common/EmailInput';
import PasswordInput from 'components/common/PasswordInput';
import SubmitButton from 'components/common/SubmitButton';
import { SIGNIN_URL } from 'constants/route';

interface AuthFormEventTarget extends EventTarget {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function SignUpForm() {
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const naviagte = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const $input = event.target as AuthFormEventTarget;
    const email = $input.email.value;
    const password = $input.password.value;

    const res = await Api.signUp({ email, password });

    if ('message' in res) {
      console.log(res.message);
    } else {
      naviagte(SIGNIN_URL);
    }
  };

  return (
    <Styled.SignUpForm onSubmit={handleSubmit}>
      <div>
        <EmailInput setIsValid={setIsValid} />
        <PasswordInput setIsValid={setIsValid} />
      </div>
      <div>
        <SubmitButton disabled={!isValid.email || !isValid.password} testId='signup-button'>
          회원가입
        </SubmitButton>
      </div>
    </Styled.SignUpForm>
  );
}
