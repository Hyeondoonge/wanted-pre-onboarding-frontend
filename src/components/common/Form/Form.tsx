import * as Styled from './Form.styled';

function EmailInput() {
  return <Styled.EmailInput data-testid='email-input' />;
}

function PasswordInput() {
  return <Styled.PasswordInput data-testid='password-input' />;
}

function Button() {
  return <Styled.SubmitButton data-testid='signup-button'>제출</Styled.SubmitButton>;
}

export default function Form() {
  return (
    <Styled.Form>
      <div>
        <EmailInput />
        <PasswordInput />
      </div>
      <div>
        <Button />
      </div>
    </Styled.Form>
  );
}
