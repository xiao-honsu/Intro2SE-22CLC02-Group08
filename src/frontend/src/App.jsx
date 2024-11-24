import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import ChooseRolePage from './pages/ChoosePole';
import PasswordRecoveryPage from './pages/PasswordRecovery';
import HomePageSeller from './pages/HomePageSeller';
import HomePageBuyer from './pages/HomePageBuyer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/ChooseRole" element={<ChooseRolePage />} />
        <Route path="/PasswordRecovery" element={<PasswordRecoveryPage />} />
        <Route path="/HomePageSeller" element={<HomePageSeller />} />
        <Route path="/HomePageBuyer" element={<HomePageBuyer />} />
      </Routes>
    </Router>
  );
}

export default App;