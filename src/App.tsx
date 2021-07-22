import React from "react";
import "./App.css";
import ContentBox from "./components/ContentBox";
import LeftSideBar from "./components/LeftSideBar";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Image Finder</h1>
        <button className="btn login">Login</button>
      </header>
      <main>
        <LeftSideBar />
        <ContentBox />
      </main>
      <footer>
        <div className="text">
          Copyright © Image Finder {new Date().getFullYear()}.
        </div>
      </footer>
    </div>
  );
}

export default App;
