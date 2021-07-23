import React from "react";
import LeftSideBar from "./LeftSideBar";
import "../styles/Layout.css";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = props => {
  return (
    <>
      <header>
        <h1>Image Finder</h1>
        <button className="btn login">Login</button>
      </header>
      <main>
        <LeftSideBar />
        <div className="contentBox">{props.children}</div>
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
