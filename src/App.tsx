import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from 'components/SignUpPage/SignUpPage';
import { SIGNUP_URL } from 'constants/route';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={SIGNUP_URL} element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
