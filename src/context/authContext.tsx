import React, { createContext, useState } from "react";
import postData from "../util/postData";

const initUserState: UserState = {
  authState: {
    isAuth: Boolean(localStorage.getItem("request_token_pocket")),
    user: null,
    token: null,
    login: () => {},
  },
  searchState: {
    query: null,
    page: null,
  },
};

export const AuthContext = createContext<UserState>(initUserState);

const AuthContextProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuthenticated] = useState<boolean>(
    initUserState.authState.isAuth
  );

  const request_token_pocket = localStorage.getItem("request_token_pocket");

  if (request_token_pocket) {
    postData("https://getpocket.com/v3/oauth/authorize", {
      consumer_key: "98304-f4372dbe518588db2ce4aa9d",
      code: request_token_pocket,
    }).then((data: any) => {
      console.log(data);
    });
  }

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        authState: {
          login,
          isAuth,
          token: null,
          user: null,
        },
        searchState: {
          query: null,
          page: null,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
