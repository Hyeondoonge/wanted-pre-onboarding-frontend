import Form from 'components/common/Form';
import * as Styled from './SignUpPage.styled';
import { useNavigate } from 'react-router';
import { SIGNIN_URL } from 'constants/route';

export default function SignUpPage() {
  const navigate = useNavigate();
  const submitHandler = () => {
    navigate(SIGNIN_URL);
  };

  return (
    <Styled.SignUpPage>
      <Form action={'회원가입'} submitHandler={submitHandler} />
    </Styled.SignUpPage>
  );
}
