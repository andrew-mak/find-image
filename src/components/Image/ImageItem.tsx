import React from "react";
import "../../styles/ImageItem.css";
import TagsBox from "../UI/TagsBox";

interface ImageItemProps {
  id: string;
  secret: string;
  server: string;
  title: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ id, secret, server, title }) => {
  return (
    <div className="card">
      <div className="imageContainer">
        <img
          src={`https://live.staticflickr.com/${server}/${id}_${secret}_${"m"}.jpg`}
          alt={title.slice(0, 26)}
        />
      </div>
      <div className="imageTitle">{title.slice(0, 46)}</div>
      <div className="actionsBar">
        <button className="bookmarkButton">Bookmark it </button>
        <TagsBox />
      </div>
    </div>
  );
};

export default ImageItem;
