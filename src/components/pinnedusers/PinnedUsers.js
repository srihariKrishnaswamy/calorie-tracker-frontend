import React, { useState, useEffect } from "react";
import "./PinnedUsers.css";
import PinnedUserCard from "../pinnedusercard/PinnedUserCard";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Col";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Trie from './Trie.js';
import { useNavigate } from "react-router-dom";
import Panel from './Panel.js';

const API_URL = "https://caltracker-backend-988509e33b53.herokuapp.com";

const PinnedUsers = (props) => {
  const [message, setMessage] = useState("");
  const [newPinEmail, setNewPinEmail] = useState("");
  const navigate = useNavigate();
  const [trie, setTrie] = useState({
    trie: new Trie(),
  });
  const [options, setOptions] = useState([])

  useEffect(() => {
    console.log(options)
  }, [options])

  const getAllUsers = async (email) => {
    var userStr = localStorage.getItem("user");
    var user = JSON.parse(userStr);
    let token = localStorage.getItem("access_token");
    token = await props.updateAccessToken(token);
    var pinnedIds = [];
    if (user.pinned_user_1_id !== null) pinnedIds.push(user.pinned_user_1_id);
    if (user.pinned_user_2_id !== null) pinnedIds.push(user.pinned_user_2_id);
    if (user.pinned_user_3_id !== null) pinnedIds.push(user.pinned_user_3_id);
    if (user.pinned_user_4_id !== null) pinnedIds.push(user.pinned_user_4_id);
    if (user.pinned_user_5_id !== null) pinnedIds.push(user.pinned_user_5_id);
    const res = await axios.get(API_URL + "/users/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    var emails = []
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].email !== email && !pinnedIds.includes(res.data[i].user_id) && res.data[i].email !== user.email) {
        emails.push([res.data[i].email, res.data[i].user_id])
      }
    }
    console.log(emails)
    trie.trie.insertList(emails);
    trie.trie.deepPrint();
  }


  const createList = () => {
    var entryList = [];
    var userStr = localStorage.getItem("user");
    var user = JSON.parse(userStr);
    if (user.pinned_user_1_id !== null)
      entryList.push(
        <PinnedUserCard
          signOut={props.signOut}
          setUser={props.setUser}
          number={1}
          setUserSelected={props.setUserSelected}
          setTodaysTotal={props.setTodaysTotal}
          setData={props.setData}
          id={user.pinned_user_1_id}
          setCurrUser={props.setCurrUser}
          updateAccessToken={props.updateAccessToken}
          trie={trie.trie}
        />
      );
    if (user.pinned_user_2_id !== null)
      entryList.push(
        <PinnedUserCard
          signOut={props.signOut}
          setUser={props.setUser}
          number={2}
          setUserSelected={props.setUserSelected}
          setTodaysTotal={props.setTodaysTotal}
          setData={props.setData}
          id={user.pinned_user_2_id}
          setCurrUser={props.setCurrUser}
          updateAccessToken={props.updateAccessToken}
          trie={trie.trie}
        />
      );
    if (user.pinned_user_3_id !== null)
      entryList.push(
        <PinnedUserCard
          signOut={props.signOut}
          setUser={props.setUser}
          number={3}
          setUserSelected={props.setUserSelected}
          setTodaysTotal={props.setTodaysTotal}
          setData={props.setData}
          id={user.pinned_user_3_id}
          setCurrUser={props.setCurrUser}
          updateAccessToken={props.updateAccessToken}
          trie={trie.trie}
        />
      );
    if (user.pinned_user_4_id !== null)
      entryList.push(
        <PinnedUserCard
          signOut={props.signOut}
          setUser={props.setUser}
          number={4}
          setUserSelected={props.setUserSelected}
          setTodaysTotal={props.setTodaysTotal}
          setData={props.setData}
          id={user.pinned_user_4_id}
          setCurrUser={props.setCurrUser}
          updateAccessToken={props.updateAccessToken}
          trie={trie.trie}
        />
      );
    if (user.pinned_user_5_id !== null)
      entryList.push(
        <PinnedUserCard
          signOut={props.signOut}
          setUser={props.setUser}
          number={5}
          setUserSelected={props.setUserSelected}
          setTodaysTotal={props.setTodaysTotal}
          setData={props.setData}
          id={user.pinned_user_5_id}
          setCurrUser={props.setCurrUser}
          updateAccessToken={props.updateAccessToken}
          trie={trie.trie}
        />
      );
    return entryList;
  };

  var entryList = createList();

  useEffect(() => {
    (async () => {
      var userStr = localStorage.getItem("user");
      var user = JSON.parse(userStr);
      var token = localStorage.getItem("access_token");
      token = await props.updateAccessToken(token);
      console.log("made it past token stuff");
      if (token === "") {
        props.signOut();
        navigate("/");
        return;
      }
      const res = await axios.get(API_URL + `/users/${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await getAllUsers(res.data.email);
      console.log("FULLY UPDATED USER & TRIE: ");
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      props.setUser(res.data);
    })();
  }, []);


  const addPin = async () => {
    var email = newPinEmail.trim().toLowerCase();
    console.log(email);
    var userStr = localStorage.getItem("user");
    var user = JSON.parse(userStr);
    var token = localStorage.getItem("access_token");
    token = await props.updateAccessToken(token);
    if (token === "") {
      props.signOut();
      navigate("/");
      return;
    }
    var res;
    try {
      res = await axios.get(API_URL + `/users?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.statusCode === 404) {
        setMessage("User not found");
        return;
      }
    } catch (e) {
      alert("User not found");
      return;
    }
    const newId = res.data.user_id;
    if (
      newId === user.pinned_user_1_id ||
      newId === user.pinned_user_2_id ||
      newId === user.pinned_user_3_id ||
      newId === user.pinned_user_4_id ||
      newId === user.pinned_user_5_id
    ) {
      setMessage("Already pinned this user!");
      return;
    }
    var newObj = {};
    if (user.pinned_user_1_id === null) {
      newObj = {
        user_id: user.user_id,
        pinned_user_1_id: newId,
        pinned_user_2_id: user.pinned_user_2_id,
        pinned_user_3_id: user.pinned_user_3_id,
        pinned_user_4_id: user.pinned_user_4_id,
        pinned_user_5_id: user.pinned_user_5_id,
      };
    } else if (user.pinned_user_2_id === null) {
      newObj = {
        user_id: user.user_id,
        pinned_user_1_id: user.pinned_user_1_id,
        pinned_user_2_id: newId,
        pinned_user_3_id: user.pinned_user_3_id,
        pinned_user_4_id: user.pinned_user_4_id,
        pinned_user_5_id: user.pinned_user_5_id,
      };
    } else if (user.pinned_user_3_id === null) {
      newObj = {
        user_id: user.user_id,
        pinned_user_1_id: user.pinned_user_1_id,
        pinned_user_2_id: user.pinned_user_2_id,
        pinned_user_3_id: newId,
        pinned_user_4_id: user.pinned_user_4_id,
        pinned_user_5_id: user.pinned_user_5_id,
      };
    } else if (user.pinned_user_4_id === null) {
      newObj = {
        user_id: user.user_id,
        pinned_user_1_id: user.pinned_user_1_id,
        pinned_user_2_id: user.pinned_user_2_id,
        pinned_user_3_id: user.pinned_user_3_id,
        pinned_user_4_id: newId,
        pinned_user_5_id: user.pinned_user_5_id,
      };
    } else if (user.pinned_user_5_id === null) {
      newObj = {
        user_id: user.user_id,
        pinned_user_1_id: user.pinned_user_1_id,
        pinned_user_2_id: user.pinned_user_2_id,
        pinned_user_3_id: user.pinned_user_3_id,
        pinned_user_4_id: user.pinned_user_4_id,
        pinned_user_5_id: newId,
      };
    } else {
      setMessage("Maxed out your pins!");
      return;
    }

    try {
      const newUserRes = await axios.patch(
        API_URL + `/users/pinned`,
        {
          user_id: newObj.user_id,
          pinned_user_1_id: newObj.pinned_user_1_id,
          pinned_user_2_id: newObj.pinned_user_2_id,
          pinned_user_3_id: newObj.pinned_user_3_id,
          pinned_user_4_id: newObj.pinned_user_4_id,
          pinned_user_5_id: newObj.pinned_user_5_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      trie.trie.delete(email);
      console.log("this is the new user from the patch");
      setMessage(`Pinned user ${email}!`);
      console.log(newUserRes.data);
      window.location.reload();
    } catch (e) {
      alert("there was an internal error, try again soon");
      return;
    }
  };

  const onUpdate = (val) => {
    setNewPinEmail(val)
    if (val.length > 2) {
      setOptions(trie.trie.startsWith(val))
    }
  }

  return (
    <div className="add-entry-container">
      <Container className="big-container">
        <Col className="entry-col" id="first">
          {entryList.length > 0 ? (
            <div>
              <h1>Pinned Users</h1>
              <div className="scrollable-panel">{entryList}</div>
            </div>
          ) : (
            <h1>Pin other users!</h1>
          )}
        </Col>
        <Col className="entry-col">
          <input
            type="text"
            className="add-input"
            placeholder="Enter User Email"
            value={newPinEmail}
            onChange={(e) => onUpdate(e.target.value.toLowerCase())}
          />
          <Panel options={options} update={onUpdate}/>
          <button className="add-entry-button" onClick={addPin} >
            Add Pin
          </button>
          <p className="msg">{message}</p>
        </Col>
      </Container>
    </div>
  );
};

export default PinnedUsers;
