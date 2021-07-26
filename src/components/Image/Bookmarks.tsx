import React from "react";
import { useBookmarks } from "../../store/bookmarks";
import ImageItem from "./ImageItem";
import "./../../styles/Bookmarks.css";

interface BookmarksProps {}

const Bookmarks: React.FC<BookmarksProps> = () => {
  const { dispatch, bookmarks } = useBookmarks();
  let bokmarkedImages = null;
  if (bookmarks && bookmarks.length) {
    bokmarkedImages = bookmarks.map(item => {
      console.log(item);
      return(<ImageItem
        item={item}
        toggleBookmark={() => dispatch({ type: "DELETE", bookmark: item })}
      />)
    });
  }
  return (
    <div className="bookmarks">
      <h2>Bookmarks</h2>
      {bokmarkedImages ? bokmarkedImages : <p>Nothing here yet :(</p>}
    </div>
  );
};

export default Bookmarks;
