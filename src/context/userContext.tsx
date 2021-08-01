import React, { createContext, useState, useCallback } from "react";
import { mapErrorMessages } from "../util/mapErrorMessages";

const initUserState: IUserState = {
  auth: {
    isAuth: Boolean(sessionStorage.getItem("token")),
    authenticate: () => {},
    logout: () => {},
    authError: null,
  },
  userData: {
    userName: sessionStorage.getItem("userName") || null,
    token: sessionStorage.getItem("token") || null,
    email: sessionStorage.getItem("email") || null,
  },
  lastSearch: {
    query: null,
    page: null,
    perPage: 10,
    setLastSearch: () => {},
  },
};

export const AppUserContext = createContext<IUserState>(initUserState);

const AppUserContextProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState(initUserState.auth);
  const [userData, setUserData] = useState(initUserState.userData);
  const [search, setSearch] = useState(initUserState.lastSearch);

  const authenticate = (authData: AuthData, action: "login" | "register") => {
    setAuth(prev => ({ ...prev, authError: null }));
    const key = process.env.REACT_APP_FIREBASE_APP_KEY;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    if (action === "register") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(authData),
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          let message = mapErrorMessages(result.error.message);
          setAuth(prev => ({ ...prev, authError: message }));
        }
        if (result.idToken) {
          setAuth(prev => ({ ...prev, isAuth: true }));
          sessionStorage.setItem("token", result.idToken);
          sessionStorage.setItem("userId", result.localId);
          sessionStorage.setItem("email", result.email);
          sessionStorage.setItem("userName", result.displayName);
          setUserData({
            userName: result.displayName,
            email: result.email,
            token: result.token,
          });
        }
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };

  const logout = () => {
    setAuth(prev => ({ ...prev, isAuth: false }));
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("email");
    setUserData({ ...initUserState.userData });
    setSearch({ ...initUserState.lastSearch });
  };

  const setLastSearch = useCallback(
    (page: number, query: string, perPage: number) => {
      setSearch(prev => ({ ...prev, page, query, perPage }));
    },
    []
  );

  return (
    <AppUserContext.Provider
      value={{
        auth: {
          ...auth,
          logout,
          authenticate,
        },
        userData: {
          ...userData,
        },
        lastSearch: {
          ...search,
          setLastSearch,
        },
      }}
    >
      {children}
    </AppUserContext.Provider>
  );
};

export default AppUserContextProvider;
