import * as Styled from './SignUpPage.styled';
import { useState } from 'react';
import EmailInput from 'components/common/EmailInput/EmailInput';
import PasswordInput from 'components/common/PasswordInput/PasswordInput';
import SubmitButton from 'components/common/SubmitButton/SubmitButton';
import { signUp } from 'apis/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { SIGNIN_URL, TODO_URL } from 'constants/route';
import Link from 'components/common/Link';

interface AuthFormEventTarget extends EventTarget {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function SignUpPage() {
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const naviagte = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const $input = event.target as AuthFormEventTarget;
    const email = $input.email.value;
    const password = $input.password.value;

    const res = await signUp({ email, password });
    if ('message' in res) {
      console.log(res.message);
    } else {
      naviagte(SIGNIN_URL);
    }
  };

  if (localStorage.getItem('access_token')) {
    return <Navigate replace to={TODO_URL} />;
  }

  return (
    <Styled.SignUpPage>
      <Styled.Form onSubmit={handleSubmit}>
        <div>
          <EmailInput setIsValid={setIsValid} />
          <PasswordInput setIsValid={setIsValid} />
        </div>
        <div>
          <SubmitButton disabled={!isValid.email || !isValid.password} testId='signup-button'>
            회원가입
          </SubmitButton>
        </div>
        <Link to={SIGNIN_URL} underline>
          가입된 계정이 있으신가요?
        </Link>
      </Styled.Form>
    </Styled.SignUpPage>
  );
}
