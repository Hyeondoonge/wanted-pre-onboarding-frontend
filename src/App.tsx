import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from 'components/SignUpPage';
import SignInPage from 'components/SignInPage';
import TodoPage from 'components/TodoPage';
import { SIGNIN_URL, SIGNUP_URL, TODO_URL } from 'constants/route';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={SIGNUP_URL} element={<SignUpPage />} />
        <Route path={SIGNIN_URL} element={<SignInPage />} />
        <Route path={TODO_URL} element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
