import './App.css';
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import UserDashboard from './components/userdashboard/UserDashboard';
import Navsection from './components/navsection/Navsection';
import jwt_decode from "jwt-decode";

const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_id: null,
    sex: "",
    weight: null,
    height: null,
    target_calories: null,
    timezone: "",
    pinned_user_1_id: null,
    pinned_user_2_id: null,
    pinned_user_3_id: null,
    pinned_user_4_id: null,
    pinned_user_5_id: null
  });

  const loadUser = (newUser) => { // this method will get called when the user successfully signs in
    const userObj = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      user_id: newUser.user_id,
      sex: newUser.sex,
      weight: newUser.weight,
      height: newUser.height,
      target_calories: newUser.target_calories,
      timezone: newUser.timezone,
      pinned_user_1_id: newUser.pinned_user_1_id,
      pinned_user_2_id: newUser.pinned_user_2_id,
      pinned_user_3_id: newUser.pinned_user_3_id,
      pinned_user_4_id: newUser.pinned_user_4_id,
      pinned_user_5_id: newUser.pinned_user_5_id
    };
    setUser(userObj);
    setIsSignedIn(true); 
    localStorage.setItem("user", JSON.stringify(userObj));
    console.log(userObj)
  };
  const signOut = async () => {
    var token = localStorage.getItem('access_token')
    localStorage.clear();
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!response.ok) {
        console.log("failed the logout serverside", response.statusText);
    }
    setUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      user_id: null,
      sex: "",
      weight: null,
      height: null,
      target_calories: null,
      timezone: "",
      pinned_user_1_id: null,
      pinned_user_2_id: null,
      pinned_user_3_id: null,
      pinned_user_4_id: null,
      pinned_user_5_id: null
    })
  }
  const updateAccessToken = async (token) => {
    if (token === "") {
      return "";
    }
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;
        localStorage.setItem("access_token", newAccessToken);
        token = newAccessToken;
        console.log("Updated access token")
      } else {
        console.log("failed the refresh token stuff", response.statusText);
        setUser({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          user_id: null,
          sex: "",
          weight: null,
          height: null,
          target_calories: null,
          timezone: "",
          pinned_user_1_id: null,
          pinned_user_2_id: null,
          pinned_user_3_id: null,
          pinned_user_4_id: null,
          pinned_user_5_id: null
        })
        return ""
      }
    }
    return token;
  }

  return (
    <div className="App">
      <Router>
        <div>
          <Navsection user={user} signOut={signOut} setUser={setUser}/>
        </div>
        <Routes>
          <Route path="/" element={<Login loadUser={loadUser}/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/userdashboard" element={<UserDashboard updateAccessToken={updateAccessToken} signOut={signOut}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
