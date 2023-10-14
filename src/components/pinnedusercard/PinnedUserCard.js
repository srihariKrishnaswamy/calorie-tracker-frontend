import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import './PinnedUserCard.css';

const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const PinnedUserCard = (props) => {
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
    useEffect(() => {
        (async () => {
            let token = localStorage.getItem("access_token");
            token = await props.updateAccessToken(token);
            if (token === "") {
                props.signOut();
                navigate("/");
            } else {
                const res = await axios.get(API_URL + `/users/${props.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCurrUser(res.data);
            }
        })()
    })
  const selectUser = async () => {
    var token = localStorage.getItem("access_token");
    token = await props.updateAccessToken(token);
    if (token === "") {
      props.signOut();
      navigate("/");
    } else {
      try {
        const res = await axios.get(
          API_URL + `/dailytotals?user_id=${props.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const list = res.data.reverse();
        var listToGraph = [];
        for (let i = 0; i < list.length; i++) {
          var obj = {
            date: list[i].curr_date.slice(5, 10),
            calories: list[i].num_calories,
          };
          listToGraph.push(obj);
        }
        props.setCurrUser(currUser);
        props.setData(listToGraph);
        props.setTodaysTotal(list[list.length - 1]);
        props.setUserSelected(true);
        console.log("all selected data: ")
        console.log(currUser);
        console.log(listToGraph);
        console.log(list[list.length - 1])
      } catch (e) {
        console.error(e);
      }
    }
  }
  const deletePin = async () => {
    var token = localStorage.getItem("access_token");
    token = await props.updateAccessToken(token);
    if (token === "") {
        props.signOut();
        navigate("/");
        return;
    }
    var userStr = localStorage.getItem("user");
    var user = JSON.parse(userStr);
    let user_id = user.user_id;
    var newObj = {}
    if (props.number === 1) {newObj = {user_id: user_id, pinned_user_1_id: null, pinned_user_2_id: user.pinned_user_2_id, pinned_user_3_id: user.pinned_user_3_id, pinned_user_4_id: user.pinned_user_4_id, pinned_user_5_id: user.pinned_user_5_id}; console.log("pin 1")}
    if (props.number === 2) {newObj = {user_id: user_id, pinned_user_1_id: user.pinned_user_1_id, pinned_user_2_id: null, pinned_user_3_id: user.pinned_user_3_id, pinned_user_4_id: user.pinned_user_4_id, pinned_user_5_id: user.pinned_user_5_id}; console.log("pin 2")}
    if (props.number === 3) {newObj = {user_id: user_id, pinned_user_1_id: user.pinned_user_1_id, pinned_user_2_id: user.pinned_user_2_id, pinned_user_3_id: null, pinned_user_4_id: user.pinned_user_4_id, pinned_user_5_id: user.pinned_user_5_id}; console.log("pin 3")}
    if (props.number === 4) {newObj = {user_id: user_id, pinned_user_1_id: user.pinned_user_1_id, pinned_user_2_id: user.pinned_user_2_id, pinned_user_3_id: user.pinned_user_3_id, pinned_user_4_id: null, pinned_user_5_id: user.pinned_user_5_id}; console.log("pin 4")}
    if (props.number === 5) {newObj = {user_id: user_id, pinned_user_1_id: user.pinned_user_1_id, pinned_user_2_id: user.pinned_user_2_id, pinned_user_3_id: user.pinned_user_3_id, pinned_user_4_id: user.pinned_user_4_id, pinned_user_5_id: null}; console.log("pin 5")}
    try {
        console.log(newObj);
        const res = await axios.patch(API_URL + `/users/pinned`, {
            user_id: newObj.user_id,
            pinned_user_1_id: newObj.pinned_user_1_id,
            pinned_user_2_id: newObj.pinned_user_2_id,
            pinned_user_3_id: newObj.pinned_user_3_id,
            pinned_user_4_id: newObj.pinned_user_4_id,
            pinned_user_5_id: newObj.pinned_user_5_id,
            headers: {
                Authorization: `Bearer ${token}`,
              }
        })
        console.log("returned user")
        console.log(res.data)
        localStorage.setItem('user', JSON.stringify(res.data));
        window.location.reload();
        console.log("pin deleted")
    } catch (e) {
        console.log(e);
    }

}
  return (
    <div className="card-border">
        <a className="desc-text" href="#specific" id="underline" onClick={selectUser}>{currUser.first_name} {currUser.last_name}</a>
        <p className="desc-text">{currUser.email}</p>
        <a className="desc-text" id="underline" onClick={deletePin}>delete pin</a>
    </div>
  )
}

export default PinnedUserCard