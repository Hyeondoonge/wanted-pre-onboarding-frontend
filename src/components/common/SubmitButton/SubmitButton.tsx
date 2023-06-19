import * as Styled from './SubmitButton.styled';

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled: boolean;
  testId: string;
}

export default function SubmitButton({ disabled, children, testId }: SubmitButtonProps) {
  return (
    <Styled.SubmitButton data-testid={testId} disabled={disabled} type='submit'>
      {children}
    </Styled.SubmitButton>
  );
}
