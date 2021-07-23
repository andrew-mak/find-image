import React from "react";
import "../../styles/SearchImages.css";

interface SearchImagesProps {}

const SearchImages: React.FC<SearchImagesProps> = () => {
  return (
    <div className="searchBox">
      <input type="text" placeholder="Find Images"></input>
      <div>
        <h3>Search result</h3>
      </div>
    </div>
  );
};

export default SearchImages;
