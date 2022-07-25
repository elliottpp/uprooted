import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//components

import InputTodo from "./todolist/InputTodo";
import ListInventory from "./trees/ListInventory";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [coins, setCoins] = useState(0);
  const [allTrees, setAllTrees] = useState([]);
  const [treesChange, setTreesChange] = useState(false);
  const [description, setDescription] = useState("");
  const [user_id, setID] = useState(0);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5001/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData);
      setAllTrees(parseData);
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

    await fetch(`http://localhost:5001/dashboard/todos/`, {
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
      toast.success("Logout successfully", {position: toast.POSITION.BOTTOM_LEFT});
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTreesChange(false);
  }, [treesChange]);

  return (
    <div>
      <nav class="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
        <div class="container-fluid">
            <div class="navbar-header" style={{flexDirection: 'row'}}>
              <img className="" style={{paddingRight:25}}width="20%" height="20%" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} ></img>
                <h2 class="navbar-brand">{name} 's Tree Inventory</h2>
            </div>
                <ul class="navbar-nav ml-aut" style={{flexDirection: 'row', whiteSpace: 'nowrap'}}>
                    <li class="nav-item"><Link className="nav-link active" to="/dashboard">inventory</Link></li>
                    <li class="nav-item"><Link className="nav-link active" to="/shop">shop</Link></li>
                    <li class="nav-item"><Link className="nav-link active" to="/ad">watch ad</Link></li>
                    <li class="nav-item"> 
                    <img className="rounded" width="41" height="38" src={`${process.env.PUBLIC_URL}/assets/images/coin.png`}></img></li>
                    <li class="nav-item"> <h2 class="navbar-brand">{coins}</h2></li>
                    <button onClick={e => logout(e)} className="btn btn-primary">
                      Logout
                    </button>
                </ul>
        </div>
    </nav>
    <div class="container">
      <ListInventory allTrees={allTrees} setTreesChange={setTreesChange} />
      </div>
    </div>
  );
};

export default Dashboard;
