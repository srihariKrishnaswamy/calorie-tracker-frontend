import React, { useState, useEffect } from "react";
import "./ShowSelectedTotals.css";
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

const ShowSelectedTotals = (props) => {
  return (
    <div className="add-entry-container" id="specific">
      {
        (props.userSelected && props.user !== null) ? (
            <div className="elements-container">
            <div className="percent">
              <p>{props.user.first_name} has eaten</p>
              <h1>{parseInt(props.todaysTotal.percent)} %</h1>
              <p>of today's calories</p>
            </div>
            <div className="light-padding"/>
            <div className="graph-container">
              <p>Past 7-Days Calories</p>
              <ResponsiveContainer width="90%" height="60%" className="actual-graph">
                <LineChart
                  width="80%"
                  height="90%"
                  data={props.data}
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
        ) : (
            <div className="elements-container">
                <p>Take a look at a pinned user!</p>
            </div>
        )
      }
    </div>
  )
}

export default ShowSelectedTotals