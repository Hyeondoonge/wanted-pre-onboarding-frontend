import { ReactNode } from 'react';
import * as Styled from './Link.styled';

export default function Link({ to, children }: { to: string; children?: ReactNode }) {
  return <Styled.Link to={to}>{children}</Styled.Link>;
}
