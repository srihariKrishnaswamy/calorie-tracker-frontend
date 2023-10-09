import React, { useState, useEffect } from "react";
import AddEntry from '../addentry/AddEntry';
import ShowTotals from "../showtotals/ShowTotals";
import jwt_decode from "jwt-decode";
import "./UserDashboard.css"

const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const UserDashboard = (props) => {
  return (
    <div>
      <AddEntry signOut={props.signOut} updateAccessToken={props.updateAccessToken}/>
      <div className="bar"></div>
      <ShowTotals signOut={props.signOut} updateAccessToken={props.updateAccessToken} />
    </div>
  )
}

export default UserDashboard