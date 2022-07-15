import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//components

import ListTrees from "./trees/ListTrees";

const Shop = ({ setAuth }) => {
  const [allShopTrees, setUpShop] = useState([]);
  const [treeChange, setTreeChange] = useState(false);
  const [user_id, setID] = useState(0);

  const getTrees = async () => {
    try {
      const res = await fetch("http://localhost:5000/shop/", {
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
    getTrees();
    setTreeChange(false);
  }, [treeChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>the shop :)</h2>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>
      <Link to="/dashboard">tree farm thing</Link>
      <ListTrees allShopTrees={allShopTrees} setTreeChange={setTreeChange} />
    </div>
  );
};

export default Shop;
