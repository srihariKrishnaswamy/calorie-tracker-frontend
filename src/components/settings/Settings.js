import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const Settings = (props) => {
  const navigate = useNavigate();
  const [sex, setSex] = useState("");
  const [targetCalories, setTargetCalories] = useState("");
  const [weight, setWeight] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messages, setMessages] = useState({
    sexMessage: "",
    targetCalsMessage: "",
    weightMessage: "",
    newPWMessage: ""
  });


  const updateUser = async () => {
    let token = localStorage.getItem("access_token");
    token = await props.updateAccessToken(token);
    if (token === "") {
      props.signOut();
      navigate("/");
    } else if (props.user != null && sex !== "") {
        const res = await axios.patch(API_URL + '/users', { // write a separate route for editing passwords
            user_id: props.user.user_id,
            sex: sex,
            weight: weight,
            target_calories: targetCalories,
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        // console.log(res.data);
        setMessages({
            sexMessage: "",
            targetCalsMessage: "",
            weightMessage: "",
            newPWMessage: messages.newPWMessage
        })
        console.log("updated user")
    }
  };

  const updatePassword = async () => {
    let token = localStorage.getItem("access_token");
    token = await props.updateAccessToken(token);
    if (token === "") {
      props.signOut();
      navigate("/");
    } else if (props.user != null && newPassword !== "") {
        if (newPassword !== confirmPassword) {
            return;
        }
        const res = await axios.patch(API_URL + '/users/password', { // write a separate route for editing passwords
            user_id: props.user.user_id,
            password: newPassword,
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
        // console.log(res.data);
        setMessages({
            sexMessage: messages.sexMessage,
            targetCalsMessage: messages.targetCalsMessage,
            weightMessage: messages.weightMessage,
            newPWMessage: ""
        })
        setNewPassword("")
        setConfirmPassword("")
        console.log("updated password")
    }
  };

  // automatically updating the data every 2 seconds after latest change:

  useEffect(() => {
    const sexTimeout = setTimeout(() => {
        updateUser();
      }, 2000);

      const targetCalsTimeout = setTimeout(() => {
        updateUser();
      }, 2000);

      const weightTimeout = setTimeout(() => {
        updateUser();
      }, 2000);

      const newPasswordTimeout = setTimeout(() => {
        updatePassword();
      }, 2000);

      const confirmPasswordTimeout = setTimeout(() => {
        updatePassword();
      }, 2000);

    return () => {
      clearTimeout(sexTimeout);
      clearTimeout(targetCalsTimeout);
      clearTimeout(weightTimeout);
      clearTimeout(newPasswordTimeout);
      clearTimeout(confirmPasswordTimeout);
    };
  }, [sex, targetCalories, weight, newPassword, confirmPassword]);

  useEffect(() => {
    ( async () => {
        const userStr = localStorage.getItem("user");
        const localUser = JSON.parse(userStr);
        let token = localStorage.getItem("access_token");
        token = await props.updateAccessToken(token);
        const res = await axios.get(API_URL + `/users?email=${localUser.email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const dbUser = res.data;
        localStorage.setItem("user", JSON.stringify(dbUser));
        props.setUser(dbUser);
        setSex(dbUser.sex);
        setWeight(dbUser.weight);
        setTargetCalories(dbUser.target_calories);
        console.log("gotten user from DB")
    })()
  }, []);

  return (
    <div className="main-container">
      <div className="column">
        <p className="info">
          {props.user.first_name || ""} {props.user.last_name || ""}
        </p>
        <p className="info">{props.user.email || ""}</p>
        <div className="info">
          <label className="label">Sex:</label>
          <select
            className="form-input"
            name="sex"
            value={sex
            }
            onChange={(e) => {
              setSex(e.target.value);
              messages.sexMessage = "updating gender..."
            }}
            required
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
          <p className="msg">{messages.sexMessage}</p>
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
              messages.targetCalsMessage = "updating target calories..."
            }}
            required
          />
          <p className="msg">{messages.targetCalsMessage}</p>
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
              messages.weightMessage = "updating weight..."
            }}
            required
          />
         <p className="msg">{messages.weightMessage}</p>
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
              messages.newPWMessage = "make sure passwords match..."
            }}
            required
          />
            <p className="msg">{messages.newPWMessage}</p>
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
              messages.newPWMessage = "make sure passwords match..."
            }}
            required
          />
          <p className="msg">{messages.newPWMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
