import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Login from './Login';
import Register from './Register';
import Secret from './Secret';
import Submit from './Submit';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
  return (
    
    <Router>
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/secrets" element={<Secret/>} />
      <Route path="/submit" element={<Submit/>} />
    </Routes>
  </Router>

  );
}
}

export default App;
