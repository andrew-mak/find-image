import React, { useContext } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Layout from "./components/Layout";
import Auth from "./components/Auth";
import SearchImages from "./components/Images/SearchImages";
import Bookmarks from "./components/Images/Bookmarks";

function App() {
  const authContext = useContext(AuthContext);

  const routs = (
    <Switch>
      <Route path="/bookmarks">
        {authContext.isAuth ? <Bookmarks /> : <Auth />}
      </Route>
      <Route path="/" component={SearchImages} />
    </Switch>
  );

  return (
    <div className="App">
      <Layout>{routs}</Layout>
      {/* <Layout>{authContext.isAuth ? routs : <Auth />}</Layout> */}
    </div>
  );
}

export default App;
