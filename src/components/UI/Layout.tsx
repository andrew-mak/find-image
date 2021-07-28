import React, { useContext } from "react";
import LeftSideBar from "./LeftSideBar";
import { BookmarksProvider } from "../../store/bookmarks";
import { Link as ReactLink } from "react-router-dom";
import { Avatar, Flex, Heading, Link } from "@chakra-ui/react";
import { AuthContext } from "../../context/authContext";
import DropDownMenu from "./DropDownMenu";

const Layout: React.FC = props => {
  const { isAuth, userData } = useContext(AuthContext);
  return (
    <>
      <Flex
        as="header"
        bgColor="#282c34"
        minH="52px"
        w="100%"
        color="white"
        alignItems="center"
      >
        <Heading ml="20px" fontSize="1.5rem" fontWeight="600">
          Image Finder
        </Heading>
        {isAuth ? (
          <Flex as="nav" ml="auto" mr="40px">
            <Avatar
              bg="gray.400"
              mx="13px"
              my="auto"
              size="sm"
              loading="lazy"
            />
            <DropDownMenu
              userName={userData.userName || userData.email || "user"}
              // logoutHandler={logoutHandler}
            />
          </Flex>
        ) : (
          <Link
            ml="auto"
            mr="40px"
            fontSize="1rem"
            _hover={{ textDecoration: "none" }}
            as={ReactLink}
            to="/login"
          >
            Login
          </Link>
        )}
      </Flex>
      <Flex as="main" w="100%" h="100%" overflowY="auto" overflowX="hidden">
        <LeftSideBar />
        <BookmarksProvider>{props.children}</BookmarksProvider>
      </Flex>
      <Flex
        as="footer"
        justifyContent="center"
        minH="40px"
        pos="sticky"
        mt="auto"
        p="10px"
        bgColor="#282c34"
        color="white"
      >
        Copyright © Image Finder {new Date().getFullYear()}.
      </Flex>
    </>
  );
};

export default Layout;
