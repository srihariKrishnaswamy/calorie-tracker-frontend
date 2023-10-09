import React, { useState, useEffect } from "react";
import "./AddEntry.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Col";
import axios from "axios";
import jwt_decode from "jwt-decode";
import EntryCard from "../entrycard/EntryCard";
import { useNavigate } from "react-router-dom";

const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const AddEntry = (props) => {
  const navigate = useNavigate();
  const [food_name, set_food_name] = useState("");
  const [description, set_description] = useState("");
  const [num_calories, set_num_calories] = useState(null);
  const [todaysEntries, setTodaysEntries] = useState([]);
  var entryList = todaysEntries.map((entry) => (
    <EntryCard
      key={entry.entry_id}
      food_name={entry.food_name}
      num_calories={entry.num_calories}
      description={entry.description}
    />
  ));

  useEffect(() => {
    (async () => {
      var userStr = localStorage.getItem("user");
      var user = JSON.parse(userStr);
      console.log("logged in user:");
      console.log(user);
      var token = localStorage.getItem("access_token");
      token = await props.updateAccessToken(token);
      if (token === "") {
        props.signOut();
        navigate("/");
        
      } else {
        try {
          const res = await axios.get(
            API_URL + `/entries?user_id=${user.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("getting list");
          console.log(res.data);
          setTodaysEntries(res.data.reverse());
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, []);

  const addEntry = async () => {
    if (food_name === "" || description === "" || num_calories === 0) {
      alert("Please enter all fields");
      return;
    }
    var token = localStorage.getItem("access_token");
    token = await props.updateAccessToken(token);
    var userStr = localStorage.getItem("user");
    var user = JSON.parse(userStr);
    const user_id = user.user_id;
    const allEntries = await axios.post(API_URL + "/entries", {
      food_name: food_name,
      description: description,
      num_calories: num_calories,
      user_id: user_id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(allEntries.data);
    setTodaysEntries(allEntries.data.reverse());
    set_food_name("");
    set_description("");
    set_num_calories("");
    window.location.reload(); 
  };
  return (
    <div className="add-entry-container">
      <Container className="big-container">
        <Col className="entry-col" id="first">
          {todaysEntries.length > 0 ? (
            <div>
              <h1>Today's Food</h1>
              <div className="scrollable-panel">{entryList}</div>
            </div>
          ) : (
            <h1>Add newly eaten food!</h1>
          )}
        </Col>
        <Col className="entry-col">
          <input
            type="text"
            className="add-input"
            placeholder="Enter Food Name"
            value={food_name}
            onChange={(e) => set_food_name(e.target.value)}
          />
          <textarea
            rows={5} // Set the number of visible rows (adjust as needed)
            cols={50} // Set the number of visible columns (adjust as needed)
            className="add-input"
            value={description}
            onChange={(e) => set_description(e.target.value)}
            placeholder="Enter Food Description"
          />
          <input
            type="number"
            className="add-input"
            placeholder="Enter # Calories"
            value={num_calories}
            onChange={(e) => set_num_calories(e.target.value)}
          />
          <button className="add-entry-button" onClick={addEntry}>
            Add Entry
          </button>
        </Col>
      </Container>
    </div>
  );
};

export default AddEntry;
