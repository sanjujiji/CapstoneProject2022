import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './common/header/Header';
import Login from './common/header/Login';
import Signup from './common/header/Signup';

export default function App() {
  let baseUrl = "http://localhost:8085/";
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route exact path ="/"  element = {<Header />} />
                <Route path = "/login"  element = {<Login />} />
                <Route path = "/signup" element ={<Signup />} />
            </Routes>
    </Router>
    </div>
  );
}

