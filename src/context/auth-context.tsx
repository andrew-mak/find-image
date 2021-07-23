import React, { createContext, useState } from "react";

const contextDefaultValues: AuthContextType = {
  isAuth: false,
  login: () => {},
};

export const AuthContext = createContext<AuthContextType>(contextDefaultValues);

const AuthContextProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuthenticated] = useState<boolean>(
    contextDefaultValues.isAuth
  );

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
