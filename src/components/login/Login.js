import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// import dotenv from 'dotenv';
// dotenv.config()
const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const Login = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onPressedSignup = (e) => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    /*
    After successful completion of this function
    - user & auth token in local storage & state
    - cookie from auth is in the browser
    */
    setLoading(true);
    e.preventDefault();
    const compEmail = formData.email.toLowerCase();
    const compPW = formData.password;
    console.log("Entered Email:", formData.email);
    console.log("Entered Password:", formData.password);
    try {
      const res = await axios.post(API_URL + "/auth", {
        email: compEmail,
        password: compPW,
      });
      const accessToken = res.data.accessToken;
      localStorage.setItem("access_token", accessToken);
      try {
        console.log(accessToken)
        const userRes = await axios.get(API_URL + `/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            email: compEmail, // Pass the email to get the user's ID
          },
        });
        console.log(userRes.data);
        props.loadUser(userRes.data);
        navigate("/userdashboard");
      } catch (err) {
        console.log("failed to load user");
        console.log(err);
        alert("Internal Troubles, try again later");
      }
    } catch (err) {
      console.log("failed to authenticate");
      console.log(err);
      alert("Invalid credentials");
    }
    setFormData({ email: "", password: "" });
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="login-box">
        {!loading ? (
          <div>
            <h2>Login to CalTracker!</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="field-content">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field-content">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <button className="login-button" type="submit">
                  Login
                </button>
              </div>
            </form>
            <div>
              <button className="login-button" onClick={onPressedSignup}>
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <ClipLoader color="#FFFFFF" loading={loading} size={50} />
        )}
      </div>
    </div>
  );
};

export default Login;
