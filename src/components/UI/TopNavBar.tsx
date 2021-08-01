import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Avatar, Button, useMediaQuery, Link } from "@chakra-ui/react";
import { AppUserContext } from "../../context/userContext";
import DropDownMenu from "../Layout/DropDownMenu";

interface TopNavBarProps {
  username: string | null;
  sideDrawerOpen: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ username, sideDrawerOpen }) => {
  const { isAuth, logout } = useContext(AppUserContext).auth;
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  const mobileBtn = (
    <Button
      id="menu-btn"
      aria-label="Menu button"
      p="5px"
      height="auto"
      bg="transparent"
      color="white"
      size="lg"
      variant="ghost"
      _hover={{ bg: "transparent" }}
      _active={{ outline: "none", bg: "transparent" }}
      _focus={{ outline: "none" }}
      _focusVisible={{ boxShadow: "inset 0px 0px 0px 1px white" }}
      onClick={sideDrawerOpen}
    >
      {"\u2630"}
    </Button>
  );

  let navElements = null;
  if (isAuth) {
    navElements = (
      <>
        {isLargerThan480 ? (
          <>
            <Avatar bg="gray.400" mx="4px" my="auto" size="sm" loading="lazy" />
            <DropDownMenu
              userName={username || "user"}
              logoutHandler={logout}
            />
          </>
        ) : (
          mobileBtn
        )}
      </>
    );
  } else {
    navElements = isLargerThan480 ? (
      <Link
        ml="auto"
        mr="60px"
        fontSize="1rem"
        _hover={{ textDecoration: "none" }}
        as={RouterLink}
        to="/login"
      >
        Login
      </Link>
    ) : (
      mobileBtn
    );
  }
  return (
    <Flex as="nav" ml="auto" pr="16px">
      {navElements}
    </Flex>
  );
};

export default TopNavBar;
