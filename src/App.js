import logo from './logo.svg';
import './App.css';
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* Some Nav component*/}
        </div>
        <Routes>
          {/* add all screens*/}
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
