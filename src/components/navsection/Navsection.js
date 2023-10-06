import {React, useState, useEffect} from 'react'
import Container from "react-bootstrap/Container";
import './Navsection.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Navsection(props) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInFN, setLoggedInFN] = useState("");
  useEffect(() => { 
    var lsUser = localStorage.getItem("user")
    if (props.user.first_name !== "") {
        setLoggedIn(true);
        setLoggedInFN(props.user.first_name + "'s ")
    } else if (lsUser) {
        console.log("Syncing state... ")
        var user = JSON.parse(lsUser)
        props.setUser(user)
    }
    console.log(props.user)
    console.log(lsUser)
  }, [])
  useEffect(() => { 
    console.log(props.user)
    if (props.user.first_name !== "") {
        setLoggedIn(true);
        setLoggedInFN(props.user.first_name + "'s ")
    }
  }, [props.user.first_name])
  const goLogin = () => {
    navigate('/login');
  }
  const goSignup = () => {
    navigate('/signup');
  }
  const goDash = () => {
    navigate('/userdashboard');
  }
  const goSettings = () => {
    navigate('/settings');
  }
  const goSearch = () => {
    navigate('/search');
  }
  const doSO = () => {
    props.signOut();
    navigate('/login')
  }
  return (
    <Container className="nav">
      <a href="/" className="site_title">{loggedInFN} Calorie Tracker</a>
      {!loggedIn ? (
        <ul className="options">
            <li>
                <a href="/login" className="option" onClick={goLogin}>Log In</a>
            </li>
            <li>
                <a href="/signup" className="option" onClick={goSignup}>Sign Up</a>
            </li>
        </ul>
      ) : (
        <ul className="options">
            <li>
                <a href="/userdashboard" className="option" onClick={goDash}>Dashboard</a>
            </li>
            <li>
                <a href="/settings" className="option" onClick={goSettings}>Settings</a>
            </li>
            <li>
                <a href="/search" className="option" onClick={goSearch}>Settings</a>
            </li>
            <li>
                <a href="/login" className="option" onClick={doSO}>Sign Out</a>
            </li>
        </ul>
      )}
    </Container>
  )
}

export default Navsection