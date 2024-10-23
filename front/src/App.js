import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';  // Protected component
import ForgotPassword from './components/forgotPassword'
import { getToken } from './utils/tokenUtils';

const App = () => {
  const isAuthenticated = !!getToken();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Protected Route */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Redirect to login if no matching route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
