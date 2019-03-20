import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="signedOut-links">
      <li><NavLink to='/signUp'>SignUp</NavLink></li>
      <li><NavLink to='/signIn'>SignIn</NavLink></li>      
    </ul>
  );
};

export default SignedOutLinks;
