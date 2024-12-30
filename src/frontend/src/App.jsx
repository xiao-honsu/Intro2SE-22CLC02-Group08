import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import SignUpPage from './pages/SignUp';
import ChooseRolePage from './pages/ChooseRole';
import PasswordRecoveryPage from './pages/PasswordRecovery';
import HomePageSeller from './pages/HomePageSeller';
import HomePageBuyer from './pages/HomePageBuyer';

import Preview from './pages/Preview_Product_Page'
import Profile from './pages/Profile'
import SellerUploadProduct from './pages/SellerUploadProduct';
import ProductDetail from './pages/ProductDetail';
import EditProfile from './pages/EditProfile';
import CartPage from './pages/CartPage';
import Payment from './pages/Payment';
import SearchResult from './pages/SearchResult';

import ScrollToTop from './components/SrollToTop';
import { UserProvider } from "./context/userContext";

import HomePageAdmin from './pages/HomePageAdmin';
import PostsSeeAll from './pages/PostsSeeAll';
import ProductsSeeAll from './pages/ProductsSeeAll';
import ReportsSeeAll from './pages/ReportsSeeAll';
import UnapprovedDetail from './pages/UnapprovedDetail';
import ListUser from './pages/ListUser';

import SupportPageSeller from './pages/SupportPageSeller';
import SupportPageBuyer from './pages/SupportPageBuyer';
import PoliciesPageSeller from './pages/PoliciesPageSeller';
import PoliciesPageBuyer from './pages/PoliciesPageBuyer';

import HelpButton from './components/Help';

function App() {
  return (
  <UserProvider>
    <Router>
      <ScrollToTop />
      <HelpButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/ChooseRole" element={<ChooseRolePage />} />
        <Route path="/PasswordRecovery" element={<PasswordRecoveryPage />} />
        <Route path="/HomePageSeller" element={<HomePageSeller />} />
        <Route path="/HomePageBuyer" element={<HomePageBuyer />} />

        <Route path="/SellerUploadProduct" element={<SellerUploadProduct />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        
        <Route path="/preview_product/:id" element={<Preview />} />
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/Payment/:productID" element={<Payment />} />
        <Route path="/search" element={<SearchResult />} />


        <Route path="/HomePageAdmin" element={<HomePageAdmin />} />
        <Route path="/PostsSeeAll" element={<PostsSeeAll />} />
        <Route path="/ProductsSeeAll" element={<ProductsSeeAll />} />
        <Route path="/ReportsSeeAll" element={<ReportsSeeAll />} />
        <Route path="/UnapprovedDetail" element={<UnapprovedDetail />} />
        <Route path="/ListUser" element={<ListUser />} />

        <Route path="/SupportPageSeller" element={<SupportPageSeller />} />
        <Route path="/SupportPageBuyer" element={<SupportPageBuyer />} />
        <Route path="/PoliciesPageSeller" element={<PoliciesPageSeller />} />
        <Route path="/PoliciesPageBuyer" element={<PoliciesPageBuyer />} />

      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;