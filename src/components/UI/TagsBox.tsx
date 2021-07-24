import React, { useState } from "react";
import "../../styles/TagsBox.css";
import { Tag, WithContext as ReactTags } from "react-tag-input";

interface TagsBoxProps {}

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const TagsBox: React.FC<TagsBoxProps> = () => {
  const [tagsState, setTagsState] = useState<Tag[]>([]);

  const handleDelete = (i: number) => {
    if (tagsState) setTagsState(tagsState.filter((_tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    if (tagsState) setTagsState(tagsState => [...tagsState!, tag]);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    if (!tagsState) return;
    const newTags = tagsState.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTagsState([...newTags]);
  };
  return (
    <div className="tagsBox">
      <ReactTags
        tags={tagsState}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
      />
    </div>
  );
};

export default TagsBox;
