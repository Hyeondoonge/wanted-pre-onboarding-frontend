import { FormEvent, useState } from 'react';
import * as Styled from './Form.styled';

interface EmailInputProps {
  setIsValid: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
    }>
  >;
}

interface PasswordInputProps {
  setIsValid: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
    }>
  >;
}

interface ButtonProps {
  disabled: boolean;
}

function EmailInput({ setIsValid }: EmailInputProps) {
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const reg = new RegExp('@');
    const res = reg.test(value);

    setIsValid((isValid) => ({ ...isValid, email: res }));
  };

  return <Styled.EmailInput data-testid='email-input' onInput={onInput} />;
}

function PasswordInput({ setIsValid }: PasswordInputProps) {
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const reg = new RegExp('^.{8,}$');
    const res = reg.test(value);

    setIsValid((isValid) => ({ ...isValid, password: res }));
  };

  return <Styled.PasswordInput data-testid='password-input' onInput={onInput} />;
}

function Button({ disabled }: ButtonProps) {
  return (
    <Styled.SubmitButton data-testid='signup-button' disabled={disabled}>
      제출
    </Styled.SubmitButton>
  );
}

export default function Form() {
  const [isValid, setIsValid] = useState({ email: false, password: false });

  return (
    <Styled.Form>
      <div>
        <EmailInput setIsValid={setIsValid} />
        <PasswordInput setIsValid={setIsValid} />
      </div>
      <div>
        <Button disabled={!isValid.email || !isValid.password} />
      </div>
    </Styled.Form>
  );
}
