import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';

import SignUpPage from './pages/SignUp';
import ChooseRolePage from './pages/ChooseRole';
import PasswordRecoveryPage from './pages/PasswordRecovery';
import HomePageSeller from './pages/HomePageSeller';
import HomePageBuyer from './pages/HomePageBuyer';
import Preview from './pages/Preview_Product_Page'
import Profile from './pages/Profile'


import ScrollToTop from './components/SrollToTop'
import { UserProvider } from "./context/userContext";

function App() {
  return (
  <UserProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/ChooseRole" element={<ChooseRolePage />} />
        <Route path="/PasswordRecovery" element={<PasswordRecoveryPage />} />
        <Route path="/HomePageSeller" element={<HomePageSeller />} />
        <Route path="/HomePageBuyer" element={<HomePageBuyer />} />

        <Route path="/preview_product/:id" element={<Preview />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;