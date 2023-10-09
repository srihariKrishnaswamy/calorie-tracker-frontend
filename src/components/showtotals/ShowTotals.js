import React, { useState, useEffect } from "react";
import "./ShowTotals.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";
const ShowTotals = (props) => {
  const navigate = useNavigate();
  const [todaysTotal, setTodaysTotal] = useState({
    daily_total_id: -1,
    user_id: -1,
    num_calories: -1,
    desired_calories: -1,
    percent: 175,
    curr_date: "",
    timezone: "",
  });
  const [pastWeek, setPastWeek] = useState([]);
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
            API_URL + `/dailytotals?user_id=${user.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("DAILY TOTALS:");
          console.log(res.data.reverse());
          const list = res.data.reverse();
          setPastWeek(list);
          setTodaysTotal(list[0]);
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, []);
  return(
  <div className="add-entry-container">
    <div className="elements-container">
      <div className="percent">
        <p>You have eaten</p>
        <h1>{parseInt(todaysTotal.num_calories * 100 / todaysTotal.desired_calories)} %</h1>
        <p>of today's target calories</p>
      </div>
    </div>
  </div>);
};

export default ShowTotals;
