import { ReactNode } from 'react';
import * as Styled from './Link.styled';

export default function Link({
  to,
  children,
  underline
}: {
  to: string;
  children?: ReactNode;
  underline?: boolean;
}) {
  return (
    <Styled.Link to={to} $underline={underline}>
      {children}
    </Styled.Link>
  );
}
