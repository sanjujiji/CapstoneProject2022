import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './common/header/Header';
import Login from './common/header/Login';
import Signup from './common/header/Signup';
import Products from './components/products/Products';
import ProductDetails from './components/products/ProductDetails';
import Order from './components/orders/Order';

export default function App() {
  let baseUrl = "http://localhost:8085/";
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route exact path ="/"  element = {<Header />} />
                <Route path = "/login"  element = {<Login />} />
                <Route path = "/signup" element = {<Signup />} />
                <Route path = "/products" element = {<Products />} />
                <Route path = "/products/:id" element = {<ProductDetails />} />
                <Route path = "/order" element = {<Order />} />
            </Routes>
      </Router>
    </div>
  );
}

