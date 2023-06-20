import { Navigate } from 'react-router-dom';
import * as Styled from './HomePage.styled';
import { SIGNIN_URL, TODO_URL } from 'constants/route';
import { SIGNUP_URL } from 'constants/route';
import Link from 'components/common/Link';

export default function HomePage() {
  const access_token = localStorage.getItem('access_token') || '';

  if (access_token) return <Navigate to={TODO_URL} />;

  return (
    <Styled.HomePage>
      <Link to={SIGNIN_URL}>로그인 하기</Link>
      <Link to={SIGNUP_URL}>회원가입 하기</Link>
    </Styled.HomePage>
  );
}
