import React, { createContext, useState } from "react";

const initUserState: IUserState = {
  isAuth: Boolean(localStorage.getItem("token")),
  auth: () => {},
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
  const [userData, setUserData] = useState(initUserState.userData);
  const [search, setSearch] = useState(initUserState.lastSearch);

  const auth = (authData: AuthData, action: "login" | "register") => {
    console.log("action: ", action);
    let data = JSON.stringify(authData);
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
      body: data,
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const expirationDate = new Date(
          new Date().getTime() + result.expiresIn * 1000
        );
        localStorage.setItem("token", result.idToken);
        localStorage.setItem("expirationDate", expirationDate.toString());
        localStorage.setItem("userId", result.localId);
        localStorage.setItem("email", result.email);
        localStorage.setItem("userName", result.displayName);

        setIsAuthenticated(true);
        setUserData({
          userName: result.displayName,
          email: result.email,
          token: result.token,
        });
      })
      .catch(error => {
        console.log("Error: ", error);
        // dispatch(authFail(error.response.data.error));
      });
  };

  const setLastSearch = (page: number, query: string) => {
    setSearch({ page, query });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
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
