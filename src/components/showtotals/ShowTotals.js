import React, { useState, useEffect } from "react";
import "./ShowTotals.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
  const [data, setData] = useState([]);
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
          const list = res.data;
          var listToGraph = [];
          for (let i = 0; i < list.length; i++) {
            var obj = {
              date: list[i].curr_date.slice(5, 10),
              calories: list[i].num_calories,
            };
            listToGraph.push(obj);
          }
          setData(listToGraph);
          setTodaysTotal(list[list.length - 1]);
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, []);
  return (
    <div className="add-entry-container">
      <div className="elements-container">
        <div className="percent">
          <p>You have eaten</p>
          <h1>{parseInt(todaysTotal.percent)} %</h1>
          <p>of today's calories</p>
        </div>
        <div className="light-padding"/>
        <div className="graph-container">
          <p>Past 7-Days Calories</p>
          <ResponsiveContainer width="90%" height="60%" className="actual-graph">
            <LineChart
              width="80%"
              height="90%"
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ShowTotals;
