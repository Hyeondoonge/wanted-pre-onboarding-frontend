import * as Styled from './SignUpPage.styled';
import SignUpForm from './SignUpForm';
import { Navigate } from 'react-router-dom';
import { SIGNIN_URL, TODO_URL } from 'constants/route';
import Link from 'components/common/Link/Link';

export default function SignUpPage() {
  if (localStorage.getItem('access_token')) {
    return <Navigate replace to={TODO_URL} />;
  }

  return (
    <Styled.SignUpPage>
      <SignUpForm />
      <Link to={SIGNIN_URL} underline>
        가입된 계정이 있으신가요?
      </Link>
    </Styled.SignUpPage>
  );
}
