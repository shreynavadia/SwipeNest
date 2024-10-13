import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserTypeSelection from './components/UserTypeSelection';
import TenantSignUp from './components/TenantSignUp';
import LandlordSignUp from './components/LandlordSignUp';
import Login from './components/Login';
import Search from './components/Search';
import SavedProperties from './components/SavedProperties';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/select-user-type" />} />
        <Route path="/select-user-type" element={<UserTypeSelection />} />
        <Route path="/signup-tenant" element={<TenantSignUp />} />
        <Route path="/signup-landlord" element={<LandlordSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved" element={<SavedProperties />} />
      </Routes>
    </Router>
  );
}

export default App;
