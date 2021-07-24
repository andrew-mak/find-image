import React, { useContext } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Layout from "./components/UI/Layout";
import Auth from "./components/Auth";
import SearchImages from "./components/Image/SearchImages";
import Bookmarks from "./components/Image/Bookmarks";

function App() {
  const authContext = useContext(AuthContext);

  const routs = (
    <Switch>
      <Route path="/bookmarks">
        {authContext.authState.isAuth ? <Bookmarks /> : <Auth />}
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
