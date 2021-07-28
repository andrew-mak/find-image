import React from "react";
import { useBookmarks } from "../../store/bookmarks";
import ImageItem from "./ImageItem";
import { Flex, Heading } from "@chakra-ui/react";
// import "./../../styles/Bookmarks.css";

const Bookmarks: React.FC = () => {
  const { dispatch, bookmarks } = useBookmarks();
  console.log("[Bookmarks] bookmarks:", bookmarks);
  let bokmarkedImages = null;
  if (bookmarks && bookmarks.length) {
    bokmarkedImages = bookmarks.map(item => (
      <ImageItem
        colScheme="red"
        btnCaption="Delete"
        item={item}
        tagsHandler={tags => {
          dispatch({ type: "EDIT_TAGS", tags, id: item.id });
        }}
        toggleBookmark={() => dispatch({ type: "DELETE", bookmark: item })}
      />
    ));
  }
  return (
    <Flex flexWrap="wrap" ml="64px" justifyContent="center">
      <Heading as="h2" w="100%" size="lg" mt="40px">
        Bookmarks
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center" p="60px 4px">
        {bokmarkedImages ? bokmarkedImages : <p>Nothing here yet :(</p>}
      </Flex>
    </Flex>
  );
};

export default Bookmarks;
