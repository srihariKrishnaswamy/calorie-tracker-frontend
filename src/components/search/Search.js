import React, { useState, useEffect } from "react";
import PinnedUsers from '../pinnedusers/PinnedUsers';
import ShowSelectedTotals from '../showselectedtotals/ShowSelectedTotals';
import { useNavigate } from "react-router-dom";

const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const Search = (props) => {
    const [currUser, setCurrUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        user_id: null,
        sex: "",
        weight: null,
        height: null,
        target_calories: null,
        timezone: "",
        pinned_user_1_id: null,
        pinned_user_2_id: null,
        pinned_user_3_id: null,
        pinned_user_4_id: null,
        pinned_user_5_id: null
    });
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
    const [userSelected, setUserSelected] = useState(false)
  return (
    <div>
      <PinnedUsers setUserSelected={setUserSelected} setTodaysTotal={setTodaysTotal} setData={setData} setCurrUser={setCurrUser} setUser={props.setUser} updateAccessToken={props.updateAccessToken} signOut={props.signOut}/>
      <div className="bar"></div>
      <ShowSelectedTotals userSelected={userSelected} currUser={currUser} todaysTotal={todaysTotal} data={data}/>
    </div>
  )
}

export default Search