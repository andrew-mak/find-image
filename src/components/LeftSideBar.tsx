import React from "react";
import { FaCloud, FaBookmark } from "react-icons/fa";
import "../styles/LeftSideBar.css";

interface LeftSideBarProps {}

const LeftSideBar: React.FC<LeftSideBarProps> = () => {
  return (
    <div className="sideBar">
      <nav>
        <Link to="/search">
          <FaCloud />
        </Link>
        <Link to="/favorites">
          <FaBookmark />
        </Link>
      </nav>
    </div>
  );
};

export default LeftSideBar;
