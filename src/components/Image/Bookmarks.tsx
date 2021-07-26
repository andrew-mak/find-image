import React from "react";
import { useBookmarks } from "../../store/bookmarks";
import ImageItem from "./ImageItem";
import "./../../styles/Bookmarks.css";

const Bookmarks: React.FC = () => {
  const { dispatch, bookmarks } = useBookmarks();
  console.log("[Bookmarks] bookmarks:", bookmarks);
  let bokmarkedImages = null;
  if (bookmarks && bookmarks.length) {
    bokmarkedImages = bookmarks.map(item => (
      <ImageItem
        item={item}
        tagsHandler={tags => {
          dispatch({ type: "EDIT_TAGS", tags, id: item.id });
        }}
        toggleBookmark={() => dispatch({ type: "DELETE", bookmark: item })}
      />
    ));
  }
  return (
    <div className="bookmarks">
      <h2>Bookmarks</h2>
      {bokmarkedImages ? bokmarkedImages : <p>Nothing here yet :(</p>}
    </div>
  );
};

export default Bookmarks;
