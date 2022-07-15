import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import myVideo from '../../assets/test.mp4';
import coin from '../../assets/coin.png';
//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [coins, setCoins] = useState(0);
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);
  const [description, setDescription] = useState("");
  const [user_id, setID] = useState(0);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData[0]);
      setAllTodos(parseData);

      setName(parseData[0].user_name);
      setID(parseData[0].user_id)
      setCoins(parseData[0].coins);
      console.log(user_id)
    } catch (err) {
      console.error(err.message);
    }
  };

  const watchAd = async () => {
    try {
    //var vid = document.getElementById("adVideo");
    //console.log(vid);
    //vid.style.display = "none";
    const body = {};
    body.reward = 20;
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt_token", localStorage.token);

    await fetch(`http://localhost:5000/dashboard/todos/`, {
      method: "POST",
      headers: myHeaders,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify(body)
    });
    } catch (err) {
      console.error(err.message);
    }
  
  }

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name} 's Tree Inventory</h2>
        <h2><img class="rounded" width="41" height="38" src={coin}></img>{coins}</h2>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      <video autoPlay muted id="adVideo" onEnded={watchAd} onPlay={e => setDescription("20")} class="embed-responsive embed-responsive-16by9">
      <source src={myVideo} type="video/mp4"/>
      </video>
      <Link to="/shop">shop</Link>
    </div>
  );
};

export default Dashboard;
