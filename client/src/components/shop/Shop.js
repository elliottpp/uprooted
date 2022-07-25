import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//components

import ListTrees from "./trees/ListTrees";

const Shop = ({ setAuth }) => {
  const [allShopTrees, setUpShop] = useState([]);
  const [treeChange, setTreeChange] = useState(false);
  const [coins, setCoins] = useState(0);
  const [user_id, setID] = useState(0);

  const getTrees = async () => {
    try {
      const res = await fetch("http://localhost:5001/shop/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData[0]);
      setUpShop(parseData);

    } catch (err) {
      console.error(err.message);
    }
  };

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5001/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setCoins(parseData[0].coins);
    } catch (err) {
      console.error(err.message);
    }
  };

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
    getTrees();
    getProfile();
    setTreeChange(false);
  }, [treeChange]);

  return (
    <div className="container">
      <nav class="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
            <img className="" style={{paddingRight:25}}width="20%" height="20%" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} ></img>
                <h2 class="navbar-brand">the shop</h2>
            </div>
            <ul class="navbar-nav ml-aut">
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
      <ListTrees allShopTrees={allShopTrees} setTreeChange={setTreeChange} />
    </div>
  );
};

export default Shop;
