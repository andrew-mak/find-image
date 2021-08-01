import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";

interface BasicButtonProps {
  colScheme: string;
  btnCaption: string;
  onClick: () => void;
}

const BasicButton: React.FC<BasicButtonProps> = ({
  colScheme,
  btnCaption,
  onClick,
}) => {
  return colScheme === "gray" ? (
    <Tooltip label="Only for authorized users" fontWeight="light" aria-label="A tooltip">
      <Button
        variant="solid"
        size="sm"
        w="90px"
        h="24px"
        paddingX="8px"
        alignSelf="flex-end"
        shrink="0"
        fontWeight="normal"
        colorScheme={colScheme}
        _active={{ outline: "none" }}
        _focus={{ outlineWidth: "none" }}
        _focusVisible={{ boxShadow: "0px 0px 0px 2px #282c34" }}
        onClick={onClick}
      >
        {btnCaption}
      </Button>
    </Tooltip>
  ) : (
    <Button
      variant="solid"
      size="sm"
      w="90px"
      h="24px"
      paddingX="8px"
      alignSelf="flex-end"
      shrink="0"
      fontWeight="normal"
      colorScheme={colScheme}
      _active={{ outline: "none" }}
      _focus={{ outlineWidth: "none" }}
      _focusVisible={{ boxShadow: "0px 0px 0px 2px #282c34" }}
      onClick={onClick}
    >
      {btnCaption}
    </Button>
  );
};

export default BasicButton;
