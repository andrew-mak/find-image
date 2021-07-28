import { Flex, Link } from "@chakra-ui/react";
import React from "react";
import { FaCloud, FaBookmark } from "react-icons/fa";
import { Link as ReactLink } from "react-router-dom";
// import "../../styles/LeftSideBar.css";

const LeftSideBar: React.FC = () => {
  return (
    <Flex w="64px" h="calc(100vh - 92px)" position="absolute" pt="48px" border="2px solid black">
      <Flex
        as="nav"
        w="100%"
        flexDir="column"
        alignItems="center"
        fontSize="1.75rem"
      >
        <Link as={ReactLink} to="/" pt="10px">
          <FaCloud />
        </Link>
        <Link as={ReactLink} to="/bookmarks" pt="10px">
          <FaBookmark />
        </Link>
      </Flex>
    </Flex>
  );
};

export default LeftSideBar;
