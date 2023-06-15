import React, { FormEvent } from 'react';
import * as Styled from './EmailInput.styled';

interface EmailInputProps {
  setIsValid: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      password: boolean;
    }>
  >;
}

export default function EmailInput({ setIsValid }: EmailInputProps) {
  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const reg = new RegExp('@');
    const res = reg.test(value);

    setIsValid((isValid) => ({ ...isValid, email: res }));
  };

  return (
    <Styled.EmailInput
      data-testid='email-input'
      onInput={onInput}
      name='email'
      placeholder='이메일을 입력하세요'
    />
  );
}
