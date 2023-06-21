import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0.5;
    transform: translateY(0px);
  }

  60% {
    opacity: 1;
    transform: translateY(-30px);
  }

  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
`;

export const Toast = styled.div`
  width: fit-content;
  padding: 20px 30px;
  position: relative;
  margin: auto;
  top: calc(50vh - 100px);
  background-color: #b94530;
  color: white;

  animation: ${fadeIn} 1s forwards;
`;
