import * as Styled from './SignUpPage.styled';
import { useState } from 'react';
import EmailInput from 'components/common/EmailInput/EmailInput';
import PasswordInput from 'components/common/PasswordInput/PasswordInput';
import SubmitButton from 'components/common/SubmitButton/SubmitButton';

export default function SignUpPage() {
  const [isValid, setIsValid] = useState({ email: false, password: false });

  return (
    <Styled.SignUpPage>
      <Styled.Form>
        <div>
          <EmailInput setIsValid={setIsValid} />
          <PasswordInput setIsValid={setIsValid} />
        </div>
        <div>
          <SubmitButton disabled={!isValid.email || !isValid.password}>회원가입</SubmitButton>
        </div>
      </Styled.Form>
    </Styled.SignUpPage>
  );
}
