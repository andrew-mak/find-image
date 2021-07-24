import React from "react";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../styles/Pagination.css";

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
  const [usersInputPage, setUsersInputPage] = useState(current);

  return (
    <div onClick={paginationClickHandler} className="controlsBlock">
      <button id="toPrev" className="controlStyle">
        <FaAngleLeft /> Back
      </button>
      <div className="controlStyle">
        Page
        <input
          type="text"
          value={usersInputPage ? usersInputPage : "1"}
          className="controlStyle pageInput"
          onChange={event => {
            setUsersInputPage(parseInt(event.target.value));
            console.log("current page changed", event.target.value);
          }}
        />{" "}
        of {total ? total : 189574}
      </div>
      <button id="toNext" className="controlStyle">
        Forward <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
