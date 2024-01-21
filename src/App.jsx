import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Nav from './Components/Nav/Nav';
import Dashboard from '../src/Pages/Dashboard/Dashboard.jsx'; 
import Identifier from '../src/Pages/Identifier/Identifier.jsx';
import Login from './Pages/Login/SignIn.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import Home from './Pages/Home/Home.jsx';
import Footer from './Components/Footer/Footer'; 
import ContactUs from './Pages/Contact/ContactUS.jsx';

function App() {
  return (
    <Router>
      <Nav />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Identifier' element={<Identifier />} />
          <Route path='/Contact' element={<ContactUs />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
