import React from "react";
import LeftSideBar from "./LeftSideBar";
import "../../styles/Layout.css";
import { BookmarksProvider } from "../../store/bookmarks";
import { Link } from "react-router-dom";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = props => {
  return (
    <>
      <header>
        <h1>Image Finder</h1>
        <Link className="login-link" to="/login">Login</Link>
        {/* <button className="btn login">Login</button> */}
      </header>
      <main>
        <LeftSideBar />
        <BookmarksProvider>
          <div className="contentBox">{props.children}</div>
        </BookmarksProvider>
      </main>
      <footer>
        <div className="text">
          Copyright © Image Finder {new Date().getFullYear()}.
        </div>
      </footer>
    </>
  );
};

export default Layout;
