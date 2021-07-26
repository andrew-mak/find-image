import React from "react";
import "../../styles/ImageItem.css";
import TagsBox from "../UI/TagsBox";

interface IImageItemProps {
  item: IBookmark;
  toggleBookmark: (bookmark: IBookmark) => void;
}

const ImageItem: React.FC<IImageItemProps> = React.memo(
  ({ item, toggleBookmark }) => {
    return (
      <div className="card">
        <div className="imageContainer">
          <img src={item.src} alt={item.title.slice(0, 26)} />
        </div>
        <div className="imageTitle">{item.title.slice(0, 46)}</div>
        <div className="actionsBar">
          <h4>{item.isInBookmarks}</h4>
          <button
            className={
              item.isInBookmarks
                ? "bookmarkButton fromboomarks"
                : "bookmarkButton"
            }
            onClick={toggleBookmark.bind(this, item)}
          >
            {item.isInBookmarks ? "Delete" :"Bookmark it"}
          </button>
          <TagsBox />
        </div>
      </div>
    );
  }
);

export default ImageItem;
