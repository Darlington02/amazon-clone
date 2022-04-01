import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './Header'
import Home from "./Home"
import CreateProducts from "./create-products"
import Checkout from "./Checkout"
import ProductPage from "./ProductPage"

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          
          <Route path="/create-products" element={<CreateProducts />} />

          <Route path="/productPage" element={<ProductPage />} />

          <Route path="/" element={
            <Home />
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
