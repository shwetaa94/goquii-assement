import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Auth from './components/Auth';
import Profile from './components/Profile';

const App: React.FC = () => {
  console.log(import.meta.env.VITE_apiKey);
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/all" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
