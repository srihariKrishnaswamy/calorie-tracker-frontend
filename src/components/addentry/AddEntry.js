import React, { useState } from "react";
import "./AddEntry.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Col";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const AddEntry = (props) => {
  const navigate = useNavigate();
  const [food_name, set_food_name] = useState("")
  const [description, set_description] = useState("")
  const [num_calories, set_num_calories] = useState(0)
  const addEntry = async () => {
    if (food_name === "" || description === "" || num_calories === 0) {
        alert("Please enter all fields")
        return;
    }
    var token = localStorage.getItem('access_token')
    console.log(token)
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
      } else {
        navigate('/')
        props.signOut()
        console.log("failed the refresh token stuff", response.statusText);
        return
      }
    }
    var userStr = localStorage.getItem('user')
    var user = JSON.parse(userStr)
    const user_id = user.user_id
    await axios.post(API_URL + '/entries', {
      food_name: food_name,
      description: description,
      num_calories: num_calories,
      user_id: user_id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(food_name)
    console.log(description)
    console.log(num_calories)
    set_food_name("")
    set_description("")
    set_num_calories("")
  }
  return (
    <div className="add-entry-container">
      <Container>
        <Col className="entry-col">
          <h1>Add newly eaten food!</h1>
        </Col>
        <Col className="entry-col">
          <input
            type="text"
            className="add-input"
            placeholder="Enter Food Name"
            value={food_name}
            onChange={(e) =>
                set_food_name(e.target.value)
            }
          />
          <textarea
            rows={5} // Set the number of visible rows (adjust as needed)
            cols={50} // Set the number of visible columns (adjust as needed)
            className="add-input"
            value={description}
            onChange={(e) =>
                set_description(e.target.value)
            }
            placeholder="Enter Food Description"
          />
          <input
            type="number"
            className="add-input"
            placeholder="Enter # Calories"
            value={num_calories}
            onChange={(e) =>
                set_num_calories(e.target.value)
            }
          />
          <button className="add-entry-button" onClick={addEntry}>Add Entry</button>
        </Col>
      </Container>
    </div>
  );
};

export default AddEntry;
