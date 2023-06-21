import * as Styled from './SignInPage.styled';
import { SIGNUP_URL, TODO_URL } from 'constants/route';
import SignInForm from './SignInForm';
import { Navigate } from 'react-router-dom';
import Link from 'components/common/Link';

export default function SignInPage() {
  if (localStorage.getItem('access_token')) {
    return <Navigate replace to={TODO_URL} />;
  }

  return (
    <Styled.SignInPage>
      <SignInForm />
      <Link to={SIGNUP_URL} underline>
        가입된 계정이 없으신가요?
      </Link>
    </Styled.SignInPage>
  );
}
