import React, { FormEvent } from 'react';
import * as Styled from './PasswordInput.styled';

interface PasswordInputProps {
  setIsValid: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
    }>
  >;
}

export default function PasswordInput({ setIsValid }: PasswordInputProps) {
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const reg = new RegExp('^.{8,}$');
    const res = reg.test(value);

    setIsValid((isValid) => ({ ...isValid, password: res }));
  };

  return (
    <Styled.PasswordInput
      data-testid='password-input'
      onInput={onInput}
      name='password'
      type='password'
      placeholder='비밀번호를 입력하세요'
    />
  );
}
