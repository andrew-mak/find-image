import { useContext } from "react";
import LeftSideBar from "./LeftSideBar";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Heading,
  Link,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";
import TopNavBar from "./TopNavBar";
import { BookmarksProvider } from "../../store/bookmarks";
import { AuthContext } from "../../context/authContext";

const Layout: React.FC = props => {
  const { userData, logout } = useContext(AuthContext);
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  const userName = userData.userName || userData.email || null;

  const {
    isOpen: sideDrawerIsOpen,
    onOpen: sideDrawerOpen,
    onClose: sideDrawerClose,
  } = useDisclosure();

  const logoutHandler = () => {
    logout();
    sideDrawerClose();
  };

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
        <Flex
          maxWidth="1280px"
          width="100%"
          ml={["4px", "16px", "76px"]}
          alignItems="center"
        >
          <Link
            as={RouterLink}
            to="/"
            _hover={{ textDecoration: "none" }}
            _focus={{ outline: "none" }}
            _focusVisible={{ boxShadow: "inset 0px 0px 0px 1px white" }}
          >
            <Heading fontSize="1.5rem" fontWeight="600">
              Image Finder
            </Heading>
          </Link>
          <TopNavBar sideDrawerOpen={sideDrawerOpen} username={userName} />
        </Flex>
      </Flex>
      <Flex as="main" w="100%" h="100%" overflowY="auto" overflowX="hidden">
        {isLargerThan480 ? (
          <LeftSideBar />
        ) : sideDrawerIsOpen ? (
          <SideDrawer
            username={userName}
            isOpen={sideDrawerIsOpen}
            onClose={sideDrawerClose}
            logoutHandler={logoutHandler}
          />
        ) : null}
        <Flex
          w="100%"
          ml={isLargerThan480 ? "64px" : "6px"}
          flexDir="column"
          overflow="hidden"
        >
          <BookmarksProvider>{props.children}</BookmarksProvider>
        </Flex>
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
