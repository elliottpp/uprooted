import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>Welcome to</h1>
      <img className="" style={{paddingBottom:25, paddingTop:0}}width="20%" height="20%" src={`${process.env.PUBLIC_URL}/assets/images/logo2.png`} ></img>
      <p>Join in and start saving our future</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Register
      </Link>
    </div>
  );
};

export default Landing;
