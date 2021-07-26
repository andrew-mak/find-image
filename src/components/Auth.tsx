import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import "../styles/Auth.css";
// import postData from "../util/postData";
import LoginButton from "./LoginButton";

const Auth = () => {
  const authContext = useContext(AuthContext);
  const [formState, setFormState] = useState({ email: "", password: "" });

  const loginHandler = () => {
    authContext.authState.user = formState.email;
    if (formState.email.trim() && formState.password.trim()) {
      authContext.authState.login();
    }
  };

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.name! === "email")
      setFormState(prev => ({ ...prev, email: target.value }));
    else if (target.name === "password")
      setFormState(prev => ({ ...prev, password: target.value }));
  };

  return (
    <div className="auth">
      <form className="authForm">
        <h2>You are not authenticated! </h2>
        <p> Please log in to continue.</p>
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          onChange={onInputChanged}
          type="text"
          value={formState.email}
          placeholder="Enter Email"
          name="email"
          required
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          onChange={onInputChanged}
          value={formState.password}
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        ></input>
        <button type="submit" onClick={loginHandler}>
          Log In
        </button>
        <p>or Login with Evernote</p>
        <LoginButton />
      </form>
    </div>
  );
};

export default Auth;

// const loginWithPocketHandler = () => {
//   let code = "";
//   const url = "https://getpocket.com/v3/oauth/request";
//   const body = {
//     consumer_key: process.env.POCKET_CONSUMER_KEY,
//     redirect_uri: process.env.REDIRECT_URI,
//   };
//   postData(url, body).then((data: any) => {
//     if (!data) return;
//     localStorage.setItem("request_token_pocket", code);
//     code = data;
//     console.log(data); // JSON data parsed by `response.json()` call
//     window.location.replace(
//       `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${process.env.REDIRECT_URI}`
//     );
//   });
//   // authContext.authState.login();
// };
