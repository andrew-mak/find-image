import React from "react";
import { Menu, MenuButton, MenuItem, MenuList, Link } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { Link as ReactLink } from "react-router-dom";

interface DropDownMenuProps {
  userName: string;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ userName }) => {
  return (
    <Menu>
      <MenuButton
        as="button"
        color="white"
        fontSize="md"
        fontWeight="medium"
        m="auto"
        p="0"
        height="auto"
        bg="transparent"
        // borderRadius="5px"
        // radius
        _hover={{ bg: "transparent" }}
        _active={{ outline: "none", bg: "transparent" }}
        _focus={{ outline: "none" }}
        // _focusVisible={{ boxShadow: "0px 0px 0px 1px white" }}
      >
        {userName} <FaChevronDown fontSize="0.5rem" />
      </MenuButton>
      <MenuList color="black">
        <MenuItem>My Profile</MenuItem>
        <Link
          as={ReactLink}
          to="/bookmarks"
          _hover={{ textDecoration: "none" }}
        >
          <MenuItem>Bookmarks</MenuItem>
        </Link>

        <MenuItem
        // onClick={logoutHandler}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDownMenu;
