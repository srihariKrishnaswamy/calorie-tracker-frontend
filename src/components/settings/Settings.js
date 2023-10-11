import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [sex, setSex] = useState(user.sex);
  const [targetCalories, setTargetCalories] = useState(user.target_calories);
  const [weight, setWeight] = useState(user.weight);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messages, setMessages] = useState({
    sexMessage: "",
    targetCalsMessage: "",
    weightMessage: "",
    heightMessage: "",
    newPWMessage: "",
  });

  // automatically updating the data:

  useEffect(() => {
    
  }, [sex, targetCalories, weight, newPassword, confirmPassword])

  useEffect(() => {
    // go to local storage, pull the user and update the state user with that info
    const userStr = localStorage.getItem("user");
    const localUser = JSON.parse(userStr);
    props.setUser(localUser);
  }, []);
  return (
    <div className="main-container">
      <div className="column">
        <p className="info">
          {props.user.first_name} {props.user.last_name}
        </p>
        <p className="info">{props.user.email}</p>
        <div className="info">
          <label className="label">Sex:</label>
          <select
            className="form-input"
            name="sex"
            value={sex}
            onChange={(e) => {
              setSex(e.target.value);
            }}
            required
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <div className="info">
          <label className="label">
            Target Calories (calulated value but you're welcome to customize!):
          </label>
          <input
            className="form-input"
            type="number"
            name="target_calories"
            value={targetCalories}
            onChange={(e) => {
              setTargetCalories(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="column">
        <div className="info">
          <label className="label">Weight (lb):</label>
          <input
            className="form-input"
            type="number"
            name="weight"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            required
          />
        </div>
        <div className="info">
          <label className="label">New Password:</label>
          <input
            className="form-input"
            type="password"
            name="weight"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            required
          />
        </div>
        <div className="info">
          <label className="label">Confirm New Password:</label>
          <input
            className="form-input"
            type="password"
            name="weight"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
