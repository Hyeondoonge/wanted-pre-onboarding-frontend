import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from 'components/SignUpPage';
import SignInPage from 'components/SignInPage';
import TodoPage from 'components/TodoPage';
import { HOME_URL, SIGNIN_URL, SIGNUP_URL, TODO_URL } from 'constants/route';
import HomePage from 'components/HomePage';
import styled from 'styled-components';
import NotFoundPage from 'components/NotFoundPage';

const StyledApp = styled.div`
  box-sizing: border-box;
  width: 500px;
  height: 500px;
  padding: 100px;

  position: fixed;
  top: calc(50vh - 250px);
  left: calc(50vw - 250px);

  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto auto;
  box-shadow: 3px 3px 8px 1px #acacac;
`;

export default function App() {
  return (
    <StyledApp>
      <BrowserRouter>
        <Routes>
          <Route path={HOME_URL} element={<HomePage />} />
          <Route path={SIGNUP_URL} element={<SignUpPage />} />
          <Route path={SIGNIN_URL} element={<SignInPage />} />
          <Route path={TODO_URL} element={<TodoPage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </StyledApp>
  );
}
