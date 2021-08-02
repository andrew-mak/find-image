import React from "react";
import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { useBookmarks } from "../store/bookmarks";
import ImageItem from "../components/Image/ImageItem";

const Bookmarks: React.FC = () => {
  const { dispatch, bookmarks } = useBookmarks();
  const toast = useToast();
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
        toggleBookmark={() => {
          dispatch({ type: "DELETE", bookmark: item });
          toast({
            title: `Deleted from bookmarks`,
            variant: "subtle",
            status: "info",
            isClosable: true,
            duration: 2000,
            position: "bottom-right",
          });
        }}
      />
    ));
  }
  return (
    <Flex overflow="auto" flexDir="column">
      <Heading as="h2" w="100%" size="lg" mt="40px">
        Bookmarks
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center" p="60px 4px">
        {bokmarkedImages ? bokmarkedImages : <Text>No images added yet.</Text>}
      </Flex>
    </Flex>
  );
};

export default Bookmarks;
