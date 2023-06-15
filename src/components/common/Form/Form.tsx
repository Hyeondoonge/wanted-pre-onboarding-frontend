import { FormEvent } from 'react';
import * as Styled from './Form.styled';

function EmailInput() {
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const reg = new RegExp('@');
    const res = reg.test(value);
  };

  return <Styled.EmailInput data-testid='email-input' onInput={onInput} />;
}

function PasswordInput() {
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const reg = new RegExp('^.{8,}$');
    const res = reg.test(value);
  };

  return <Styled.PasswordInput data-testid='password-input' onInput={onInput} />;
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
