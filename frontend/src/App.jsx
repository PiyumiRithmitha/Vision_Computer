import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import AdminDashboard from './components/AdminDashboard'
import CustomerDashboard from './components/CustomerrDashboard'
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/admin/*" element={<AdminDashboard />} />

        <Route path="/customer/*" element={<CustomerDashboard />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

