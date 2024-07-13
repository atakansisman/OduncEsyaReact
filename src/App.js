import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Items from './components/Items';
import Shopping from './components/Shopping';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Payment from './components/Payment';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter(i => i !== item));
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="home" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}>
            <Route path="items" element={<Items />} />
            <Route path="shopping" element={<Shopping addToCart={addToCart} />} />
            <Route path="cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
