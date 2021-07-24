import React from "react";
import { FaCloud, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/LeftSideBar.css";

interface LeftSideBarProps {}

const LeftSideBar: React.FC<LeftSideBarProps> = () => {
  return (
    <div className="sideBar">
      <nav>
        <Link to="/">
          <FaCloud />
        </Link>
        <Link to="/bookmarks">
          <FaBookmark />
        </Link>
      </nav>
    </div>
  );
};

export default LeftSideBar;
