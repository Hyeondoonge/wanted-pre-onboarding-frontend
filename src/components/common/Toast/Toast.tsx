import { createPortal } from 'react-dom';
import * as Styled from './Toast.styled';
import { ReactNode } from 'react';

export default function Toast({ children }: { children: ReactNode }) {
  return createPortal(
    <Styled.Toast>{children}</Styled.Toast>,
    document.getElementById('toast') as HTMLElement
  );
}
