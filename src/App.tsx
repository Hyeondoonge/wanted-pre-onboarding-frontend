import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from 'components/SignUpPage/SignUpPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
