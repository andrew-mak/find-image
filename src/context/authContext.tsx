import React, { createContext, useState, useCallback } from "react";
import { mapErrorMessages } from "../util/mapErrorMessages";

const initUserState: IUserState = {
  isAuth: Boolean(localStorage.getItem("token")),
  auth: () => {},
  logout: () => {},
  authError: null,
  setLastSearch: () => {},
  userData: {
    userName: localStorage.getItem("userName") || null,
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
  },
  lastSearch: {
    query: null,
    page: null,
  },
};

export const AuthContext = createContext<IUserState>(initUserState);

const AuthContextProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuthenticated] = useState<boolean>(initUserState.isAuth);
  const [authError, setAuthError] = useState(initUserState.authError);
  const [userData, setUserData] = useState(initUserState.userData);
  const [search, setSearch] = useState(initUserState.lastSearch);

  const auth = (authData: AuthData, action: "login" | "register") => {
    setAuthError(null);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVhAIbllGCjsLt-6w0tkaquGOFR6dNrIA";
    if (action === "register") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVhAIbllGCjsLt-6w0tkaquGOFR6dNrIA";
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
          setAuthError(message);
        }
        if (result.idToken) {
          setIsAuthenticated(true);
          localStorage.setItem("token", result.idToken);
          localStorage.setItem("userId", result.localId);
          localStorage.setItem("email", result.email);
          localStorage.setItem("userName", result.displayName);
          setUserData({
            userName: result.displayName,
            email: result.email,
            token: result.token,
          });
        }
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    setUserData({ ...initUserState.userData });
    setSearch({ ...initUserState.lastSearch });
  };

  const setLastSearch = useCallback((page: number, query: string) => {
    setSearch({ page, query });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        authError,
        logout,
        auth,
        setLastSearch,
        userData: {
          ...userData,
        },
        lastSearch: {
          ...search,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
