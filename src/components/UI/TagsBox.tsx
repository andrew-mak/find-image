import React, { useState } from "react";
import { Tag, WithContext as ReactTags } from "react-tag-input";
import "../../styles/ReactTags.css";

interface TagsBoxProps {
  tagsHandler: (tags: string[] | null) => void;
  tags: Tag[];
  restrictions?: boolean;
}

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const TagsBox: React.FC<TagsBoxProps> = ({ tagsHandler, tags }) => {
  const [tagsState, setTagsState] = useState<Tag[]>(tags);

  const handleDelete = (i: number) => {
    if (tagsState) {
      let updState = tagsState.filter((_tag, index) => index !== i);
      setTagsState([...updState]);
      tagsHandler(updState.map(t => t.text));
    }
  };

  const handleAddition = (tag: Tag) => {
    if (tagsState) {
      setTagsState(tagsState => [...tagsState!, tag]);
      tagsHandler([...tagsState, tag].map(t => t.text));
    } else {
      setTagsState([tag]);
      tagsHandler([tag.text]);
    }
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    if (!tagsState) return;
    const newTags = tagsState.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTagsState([...newTags]);
    tagsHandler([...newTags].map(t => t.text));
  };
  return (
    <>
      <ReactTags
        autofocus={false}
        placeholder={"add tag "}
        inputFieldPosition={"inline"}
        tags={tagsState}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
      />
    </>
  );
};

export default TagsBox;
