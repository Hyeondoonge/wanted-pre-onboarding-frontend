import * as ReactRouterDom from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(ReactRouterDom.Link)`
  width: 150px;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  border-radius: 3px;
  color: white;
  background-color: #5867dc;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    filter: brightness(90%);
  }
`;
