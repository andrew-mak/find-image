import React, { useState, useEffect } from "react";
import { Button, Center, Flex, Select, useMediaQuery } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
  total: number | null;
  current: number | null;
  paginationClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  perpageHandler: (value: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  paginationClickHandler,
  perpageHandler,
}) => {
  const [curPage, setCurPage] = useState(current || 1);
  const [totalPages, setTotalPages] = useState(total || 1);
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");

  useEffect(() => {
    if (current) setCurPage(current);
    if (total) setTotalPages(total);
  }, [current, total]);

  return (
    <>
      <Select
        variant="outline"
        height="32px"
        marginRight="8px"
        defaultValue={10}
        onChange={event => perpageHandler(event.target.value)}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </Select>
      <Flex onClick={paginationClickHandler}>
        <Button
          id="toPrev"
          variant="solid"
          backgroundColor="gray.100"
          size="sm"
          fontSize="1rem"
          fontWeight="normal"
          leftIcon={<FaAngleLeft />}
          _active={{ outline: "none" }}
          _focus={{ outlineWidth: "none" }}
          _focusVisible={{ boxShadow: "0px 0px 0px 2px #282c34" }}
        >
          {isLargerThan480 ? "Back" : ""}
        </Button>
        <Center
          px="10px"
          border="1px solid #e2e8f0"
          borderRadius="8px"
          whiteSpace="nowrap"
        >
          Page &nbsp; <b>&nbsp;{curPage}&nbsp;</b>&nbsp; of &nbsp;
          {totalPages || 1}
        </Center>
        <Button
          id="toNext"
          variant="solid"
          backgroundColor="gray.100"
          size="sm"
          fontSize="1rem"
          fontWeight="normal"
          rightIcon={<FaAngleRight />}
          _active={{ outline: "none" }}
          _focus={{ outlineWidth: "none" }}
          _focusVisible={{ boxShadow: "0px 0px 0px 2px #282c34" }}
        >
          {isLargerThan480 ? "Forward" : ""}
        </Button>
      </Flex>
    </>
  );
};

export default Pagination;
