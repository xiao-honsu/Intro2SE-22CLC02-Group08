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
import HomePageAdmin from './pages/HomePageAdmin';
import PostsSeeAll from './pages/PostsSeeAll';
import ProductsSeeAll from './pages/ProductsSeeAll';
import ReportsSeeAll from './pages/ReportsSeeAll';
import UnapprovedDetail from './pages/UnapprovedDetail';
import ListUser from './pages/ListUser';

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
        <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
        <Route path="/PostsSeeAll" element={<PostsSeeAll />} />
        <Route path="/ProductsSeeAll" element={<ProductsSeeAll />} />
        <Route path="/ReportsSeeAll" element={<ReportsSeeAll />} />
        <Route path="/UnapprovedDetail" element={<UnapprovedDetail />} />
        <Route path="/ListUser" element={<ListUser />} />
      </Routes>
    </Router>
  );
}

export default App;