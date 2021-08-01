import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { AppUserContext } from "./context/userContext";
import Auth from "./pages/Auth";
import SearchImages from "./pages/SearchImages";
import Bookmarks from "./pages/Bookmarks";
import Layout from "./components/Layout/Layout";
import "./App.css";

function App() {
  const authContext = useContext(AppUserContext);

  const routs = (
    <Switch>
      <Route path="/search" component={SearchImages} />
      <Route path="/bookmarks">
        {authContext.auth.isAuth ? (
          <Bookmarks />
        ) : (
          <Auth action="login" redirect={"/bookmarks"} />
        )}
      </Route>
      <Route
        path="/login"
        component={() => <Auth action="login" redirect={"/"} />}
      />
      <Route path="/" component={SearchImages} />
    </Switch>
  );

  return (
    <div className="App">
      <Layout>{routs}</Layout>
    </div>
  );
}

export default App;
