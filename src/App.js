import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WashPage from './pages/WashPage';

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wash/:user" element={<WashPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </>
  );
}

export default App;

/*
<Route path="about" element={<AboutPage />} />
<Route path="*" element={<Navigate to="/" />} />
*/