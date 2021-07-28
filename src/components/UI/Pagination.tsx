import React, { useState, useEffect } from "react";
import { Button, Center, Flex } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
  total: number | null;
  current: number | null;
  paginationClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  paginationClickHandler,
}) => {
  const [curPage, setCurPage] = useState(current || 1);
  const [totalPages, setTotalPages] = useState(total || 1);

  useEffect(() => {
    if (current) setCurPage(current);
    if (total) setTotalPages(total);
  }, [current, total]);

  return (
    <Flex onClick={paginationClickHandler} pt="16px">
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
        Back
      </Button>
      <Center px="10px" border="1px solid #e2e8f0" borderRadius="8px">
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
        Forward
      </Button>
    </Flex>
  );
};

export default Pagination;
