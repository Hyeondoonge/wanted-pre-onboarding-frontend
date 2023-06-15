import * as Styled from './SubmitButton.styled';

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled: boolean;
}

export default function SubmitButton({ disabled, children }: SubmitButtonProps) {
  return (
    <Styled.SubmitButton disabled={disabled} type='submit'>
      {children}
    </Styled.SubmitButton>
  );
}
