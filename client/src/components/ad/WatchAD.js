import React, { useEffect, useState} from "react";
import { toast } from "react-toastify";
import { Link, useHistory} from "react-router-dom";

const WatchAD = ({setAuth}) => {
  const history = useHistory();
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


  const watchAd = async () => {
    try {
    const body = {};
    body.reward = 20;
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt_token", localStorage.token);
    
        
    const res = await fetch(`http://localhost:5001/dashboard/todos/`, {
      method: "POST",
      headers: myHeaders,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify(body)
    });

    let resData = await res.json();
    toast.success("+20 coins", {position: toast.POSITION.BOTTOM_LEFT});
    history.push(resData);
    } catch (err) {
      console.error(err.message);
    }


  
  }



  return (
    <div>
      <nav class="navbar navbar-dark navbar-expand-sm bg-dark fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
            <img className="" style={{paddingRight:25}}width="20%" height="20%" src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} ></img>
                <h2 class="navbar-brand">watch ad</h2>
            </div>
                <ul class="navbar-nav ml-aut">
                    <li class="nav-item"><Link className="nav-link active" to="/dashboard">inventory</Link></li>
                    <li class="nav-item"><Link className="nav-link active" to="/shop">shop</Link></li>
                    <li class="nav-item"><Link className="nav-link active" to="/ad">watch ad</Link></li>
                    <button onClick={e => logout(e)} className="btn btn-primary">
                      Logout
                    </button>
                </ul>
        </div>
    </nav>
      <video autoPlay muted id="adVideo" onEnded={watchAd} className="embed-responsive embed-responsive-16by9">
      <source src={`${process.env.PUBLIC_URL}/assets/videos/test.mp4`} type="video/mp4"/>
      </video>
    </div>
  );
};

export default WatchAD;
