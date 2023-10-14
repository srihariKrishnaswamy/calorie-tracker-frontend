import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// import dotenv from 'dotenv';
// dotenv.config()
const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const Signup = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    feet: 0,
    inches: -1,
    first_name: "",
    last_name: "",
    birth_day: "",
    sex: "",
    weight: 0,
    target_calories: 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [loading, setLoading] = useState(false);

  const onPressedLogin = (e) => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (formData.confirm_password !== formData.password) {
      alert("Passwords do not match");
      return;
    }
    const compEmail = formData.email.toLowerCase().trim();
    const compPW = formData.password.trim();
    var finalHeight = parseInt(formData.feet * 12) + parseInt(formData.inches);
    var cmHeight = 2.54 * finalHeight;
    var kgWeight = formData.weight * 0.45359237
    const today = new Date();
    const year = parseInt(today.getFullYear());
    var age = year - parseInt(formData.birth_day.slice(0, 4));
    console.log(age);
    var desiredCals = 0
    if (formData.sex === 'M') {
      desiredCals = 88.362 + (13.397 * kgWeight) + (4.799 * cmHeight) - (5.677 * age)
    } else {
      desiredCals = 447.593 + (9.247 * kgWeight) + (3.098 * cmHeight) - (5.330 * age)
    }
    try {
      const res = await axios.post(API_URL + "/users", {
        email: compEmail,
        password: compPW,
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_day: formData.birth_day,
        sex: formData.sex,
        weight: formData.weight,
        height: finalHeight,
        target_calories: formData.target_calories,
        timezone: formData.timezone,
        target_calories: desiredCals,
      });
    } catch (err) {
      console.log(err);
      alert("Duplicate Email");
    }
    setFormData({
      email: "",
      password: "",
      confirm_password: "",
      feet: 0,
      inches: 0,
      first_name: "",
      last_name: "",
      birth_day: "",
      sex: "",
      weight: 0,
      target_calories: 0,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setLoading(false);
    navigate("/");
  };

  return (
      <div className="login-box">
        {!loading ? (
          <div>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="columns">
                <div className="column">
                  <div className="field-content">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field-content">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                  <div className="field-content">
                    <label>Confirm password:</label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="field-content">
                    <label>Sex:</label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="field-content">
                    <label>Height:</label>
                    <div className="height-selectors">
                      <select
                        name="feet"
                        value={formData.feet}
                        onChange={handleChange}
                        required
                      >
                        <option value={0}>Feet</option>
                        <option value={3}>3 ft</option>
                        <option value={4}>4 ft</option>
                        <option value={5}>5 ft</option>
                        <option value={6}>6 ft</option>
                        <option value={7}>7 ft</option>
                      </select>
                      <select
                        name="inches"
                        value={formData.inches}
                        onChange={handleChange}
                        required
                      >
                        <option value={-1}>Inches</option>
                        <option value={0}>0 in</option>
                        <option value={1}>1 in</option>
                        <option value={2}>2 in</option>
                        <option value={3}>3 in</option>
                        <option value={4}>4 in</option>
                        <option value={5}>5 in</option>
                        <option value={6}>6 in</option>
                        <option value={7}>7 in</option>
                        <option value={8}>8 in</option>
                        <option value={9}>9 in</option>
                        <option value={10}>10 in</option>
                        <option value={11}>11 in</option>
                      </select>
                    </div>
                  </div>
                  <div className="field-content">
                    <label>Weight:</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field-content">
                    <label>Birth Day:</label>
                    <input
                      type="date"
                      name="birth_day"
                      value={formData.birth_day}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div></div>
              </div>
              <button className="login-button" type="submit">
                Sign Up
              </button>
            </form>
            <div>
              <button className="login-button" onClick={onPressedLogin}>
                Login
              </button>
            </div>
          </div>
        ) : (
          <ClipLoader color="#FFFFFF" loading={loading} size={50} />
        )}
      </div>
  );
};

export default Signup;
