import React from "react";
import { Center, Flex, Text, Tooltip, WrapItem } from "@chakra-ui/react";
import { Tag } from "react-tag-input";
import BasicButton from "../UI/BasicButton";
import TagsBox from "../UI/TagsBox";

interface IImageItemProps {
  item: IBookmark;
  restrictions?: boolean;
  colScheme: string;
  btnCaption: string;
  tagsHandler: (tags: string[] | null) => void;
  toggleBookmark: (bookmark: IBookmark) => void;
}

const ImageItem: React.FC<IImageItemProps> = React.memo(
  ({
    item,
    restrictions,
    colScheme,
    btnCaption,
    toggleBookmark,
    tagsHandler,
  }) => {
    let tags = [] as Tag[];
    if (item.tags && item.tags.length) {
      tags = item.tags.map(t => ({ id: t, text: t }));
    }

    return (
      <WrapItem
        key={item.id}
        border="1px solid lightgray"
        minW="100px"
        minH="100px"
      >
        <Flex direction="column" h="100%">
          <Center flexDirection="column" p="14px 16px">
            <img src={item.src} alt={item.title.slice(0, 26)} loading="lazy" />
            <Tooltip label={item.title} bgColor="gray.200" color="black" fontWeight="normal" aria-label="A tooltip">
              <Text maxW="360px" pt="6px" fontSize="md" isTruncated>
                {item.title}
              </Text>
            </Tooltip>
          </Center>
          <Flex mt="auto" p="14px 16px" bgColor="#eeeeee">
            <BasicButton
              colScheme={colScheme || "blue"}
              btnCaption={btnCaption}
              onClick={() => toggleBookmark(item)}
            />
            <TagsBox
              tags={tags}
              tagsHandler={tagsHandler}
              restrictions={restrictions}
            />
          </Flex>
        </Flex>
      </WrapItem>
    );
  }
);

export default ImageItem;
