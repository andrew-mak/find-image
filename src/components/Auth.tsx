import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "../styles/Auth.css";

const Auth = () => {
  const authContext = useContext(AuthContext);

  const loginHandler = () => {
    authContext.authState.login();
  };

  return (
    <div className="auth">
      <div className="authForm">
        <h2>You are not authenticated! </h2>
        <p> Please log in to continue.</p>
        <button onClick={loginHandler}> Log In </button>
      </div>
    </div>
  );
};

export default Auth;
