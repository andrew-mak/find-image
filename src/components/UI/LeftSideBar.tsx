import { Flex, Link, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FaCloud, FaBookmark } from "react-icons/fa";
import { Link as ReactLink } from "react-router-dom";

const LeftSideBar: React.FC = () => {
  return (
    <Flex
      w="64px"
      h="calc(100vh - 93px)"
      position="absolute"
      pt="16px"
      border="2px solid #282c34"
      borderTopWidth="1px"
      borderBottomWidth="1px"
    >
      <Flex
        as="nav"
        w="100%"
        flexDir="column"
        alignItems="center"
        fontSize="1.75rem"
      >
        <Tooltip label="Search images" aria-label="A tooltip">
          <Link
            as={ReactLink}
            to="/"
            mb="10px"
            p="16px"
            backgroundColor="#ffe4c4"
            _active={{ color: "#3182ce" }}
            _focus={{ color: "#3182ce" }}
            _focusVisible={{ boxShadow: "0px 0px 0px 2px #282c34" }}
          >
            <FaCloud />
          </Link>
        </Tooltip>
        <Tooltip label="Images in bookmarks" aria-label="A tooltip">
          <Link
            as={ReactLink}
            to="/bookmarks"
            mt="10px"
            p="16px"
            backgroundColor="#ffe4c4"
            _active={{ color: "#e53e3e" }}
            _focus={{ color: "#e53e3e" }}
            _focusVisible={{ boxShadow: "0px 0px 0px 2px #282c34" }}
          >
            <FaBookmark />
          </Link>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default LeftSideBar;
