import React, { createContext, useState } from "react";

const initUserState: userState = {
  authState: {
    isAuth: false,
    user: null,
    token: null,
    login: () => {},
  },
  searchState: {
    query: null,
    page: null,
  },
};

export const AuthContext = createContext<userState>(initUserState);

const AuthContextProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuthenticated] = useState<boolean>(
    initUserState.authState.isAuth
  );

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
