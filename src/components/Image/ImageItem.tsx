import React from "react";
import { Tag } from "react-tag-input";
import TagsBox from "../UI/TagsBox";
import "../../styles/ImageItem.css";

interface IImageItemProps {
  item: IBookmark;
  classes: string;
  btnCaption: string;
  tagsHandler: (tags: string[] | null) => void;
  toggleBookmark: (bookmark: IBookmark) => void;
}

const ImageItem: React.FC<IImageItemProps> = React.memo(
  ({ item, classes, btnCaption, toggleBookmark, tagsHandler }) => {
    console.log("Render CARD");
    console.log("item: ", item);

    let tags = [] as Tag[];
    if (item.tags && item.tags.length) {
      tags = item.tags.map(t => ({ id: t, text: t }));
    }

    return (
      <div className="card">
        <div className="imageContainer">
          <img src={item.src} alt={item.title.slice(0, 26)} />
        </div>
        <div className="imageTitle">{item.title.slice(0, 46)}</div>
        <div className="actionsBar">
          <h4>{item.isInBookmarks}</h4>
          <button className={classes} onClick={() => toggleBookmark(item)}>
            {btnCaption}
          </button>
          <TagsBox tags={tags} tagsHandler={tagsHandler} />
        </div>
      </div>
    );
  }
);

export default ImageItem;
