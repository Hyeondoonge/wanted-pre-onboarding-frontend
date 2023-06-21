import * as ReactRouterDom from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(ReactRouterDom.Link)<{ $underline?: boolean }>`
  text-align: center;
  text-decoration: ${(props) => (props.$underline ? 'default' : 'none')};
  padding: 10px;
  border-radius: 3px;
  color: black;
  cursor: pointer;
`;
