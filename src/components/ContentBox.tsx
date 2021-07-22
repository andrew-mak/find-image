import React from "react";
import "../styles/ContentBox.css";

interface ContentBoxProps {}

const ContentBox: React.FC<ContentBoxProps> = () => {
  return (
    <div className="contentBox">
      <div className="searchBox">
        <input type="text" placeholder="Find Images"></input>
      </div>
      <div className="searchResults"></div>
    </div>
  );
};

export default ContentBox;
