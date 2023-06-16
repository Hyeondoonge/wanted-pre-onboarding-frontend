import EmailInput from 'components/common/EmailInput/EmailInput';
import * as Styled from './SignInPage.styled';
import PasswordInput from 'components/common/PasswordInput/PasswordInput';
import SubmitButton from 'components/common/SubmitButton/SubmitButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'apis/auth';
import { TODO_URL } from 'constants/route';

interface AuthFormEventTarget extends EventTarget {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function SignInPage() {
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const naviagte = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const $input = event.target as AuthFormEventTarget;
    const email = $input.email.value;
    const password = $input.password.value;

    const res = await signIn({ email, password });
    if ('message' in res) {
      console.log(res.message);
    } else {
      localStorage.setItem('access_token', res.access_token);
      naviagte(TODO_URL);
    }
  };

  return (
    <Styled.SignInPage>
      <Styled.Form onSubmit={handleSubmit}>
        <div>
          <EmailInput setIsValid={setIsValid} />
          <PasswordInput setIsValid={setIsValid} />
        </div>
        <div>
          <SubmitButton disabled={!isValid.email || !isValid.password}>로그인</SubmitButton>
        </div>
      </Styled.Form>
    </Styled.SignInPage>
  );
}
