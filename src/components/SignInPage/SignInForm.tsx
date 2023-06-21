import React, { useState } from 'react';
import * as Styled from './SignInPage.styled';
import { useNavigate } from 'react-router-dom';
import * as Api from 'apis/auth';
import EmailInput from 'components/common/EmailInput';
import PasswordInput from 'components/common/PasswordInput';
import SubmitButton from 'components/common/SubmitButton';
import { TODO_URL } from 'constants/route';
import Toast from 'components/common/Toast';

interface AuthFormEventTarget extends EventTarget {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function SignInForm() {
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const naviagte = useNavigate();
  const [toast, setToast] = useState({ message: '', index: 0 });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const $input = event.target as AuthFormEventTarget;
    const email = $input.email.value;
    const password = $input.password.value;

    const res = await Api.signIn({ email, password });
    if ('message' in res) {
      setToast((toast) => ({ message: res.message, index: toast.index + 1 }));
    } else {
      localStorage.setItem('access_token', res.access_token);
      naviagte(TODO_URL);
    }
  };

  return (
    <>
      <Styled.SignInForm onSubmit={handleSubmit}>
        <div>
          <EmailInput setIsValid={setIsValid} />
          <PasswordInput setIsValid={setIsValid} />
        </div>
        <div>
          <SubmitButton disabled={!isValid.email || !isValid.password} testId='signin-button'>
            로그인
          </SubmitButton>
        </div>
      </Styled.SignInForm>
      {toast.message && <Toast key={`${toast}-${toast.index}`}>{toast.message}</Toast>}
    </>
  );
}
