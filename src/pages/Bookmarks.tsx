import React from "react";
import { useBookmarks } from "../store/bookmarks";
import ImageItem from "../components/Image/ImageItem";
import { Flex, Heading } from "@chakra-ui/react";

const Bookmarks: React.FC = () => {
  const { dispatch, bookmarks } = useBookmarks();
  let bokmarkedImages = null;
  if (bookmarks && bookmarks.length) {
    bokmarkedImages = bookmarks.map(item => (
      <ImageItem
        key={item.id}
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
