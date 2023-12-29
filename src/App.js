// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import authService from './Service/Auth';
import Home from './Components/Home';
import Login from './Components/Login';
import Cart from './Components/Cart';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    console.log("a")
    const storedToken = localStorage.getItem('token');
    console.log(storedToken)
    if (storedToken) {
      setLoggedInUser('user'); 
    }
  }, []);

  const handleLogin = async (username, password) => {
    console.log(username,password)
    try {
      const { token } = await authService.login(username, password);
      localStorage.setItem('token', token);
      setLoggedInUser(username);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };

  console.log(loggedInUser)
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            loggedInUser ? (
              <Home  onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            loggedInUser ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/logout"
          element={<Navigate to="/login" replace />}
        />
        <Route
          path="/cart"
          element={<Cart  />}
        />
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
