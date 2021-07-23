import React, { ReactNode, useEffect, useRef } from "react";
import { useState } from "react";
import useHttp from "../../hooks/http";
import "../../styles/SearchImages.css";
import Pagination from "../Pagination";

interface SearchImagesProps {}

const SearchImages: React.FC<SearchImagesProps> = () => {
  const [enteredQuery, setEnteredQuery] = useState("");
  const [pagination, setPagination] = useState({
    total: 1,
    current: 1,
  });
  const [readyImages, setReadyImages] = useState<null | ReactNode[]>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, data, error, sendRequest } = useHttp();

  const makeImgs = (srcArr: any[]) => {
    const images = srcArr.map(img => (
      <div className="card" key={img.id}>
        <img
          src={`https://live.staticflickr.com/${img.server}/${img.id}_${
            img.secret
          }_${"m"}.jpg`}
          alt={img.title}
        />
        <div className="imgTitle">{img.title}</div>
        <div className="actionsBar">
          <button>Bookmark it V</button>
        </div>
      </div>
    ));
    setReadyImages(images);
  };

  useEffect(() => {
    console.log("data: ", data);
    if (!isLoading && !error && data) {
      makeImgs(data.photos.photo);
      setPagination({
        current: data.photos.page,
        total: data.photos.pages,
      });
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        inputRef.current &&
        inputRef.current.value.length !== 0 &&
        enteredQuery === inputRef.current.value
      ) {
        const query = enteredQuery;
        sendRequest(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=189f9704c734c2efe2932a78628553c7&text=${query}&per_page=10&format=json&nojsoncallback=1`,
          "GET"
        );
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [enteredQuery, sendRequest]);

  const paginatiOnClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (!pagination.current || !target.id) return;
    let move = 0;
    if (target.id === "toPrev" && pagination.current > 1) move = -1;
    else if (target.id === "toNext" && pagination.current < pagination.total)
      move = 1;

    sendRequest(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=189f9704c734c2efe2932a78628553c7&text=${enteredQuery}&per_page=10&page=${
        pagination.current + move
      }&format=json&nojsoncallback=1`,
      "GET"
    );

    console.log(target);
  };

  return (
    <div className="searchBox">
      <input
        type="text"
        ref={inputRef}
        placeholder="Find Images"
        value={enteredQuery}
        onChange={event => setEnteredQuery(event.target.value)}
      />
      {readyImages ? (
        <div className="paginationBox">
          <Pagination
            {...pagination}
            paginationClickHandler={paginatiOnClick}
          />
        </div>
      ) : null}
      <div className="resultsBox">
        {readyImages ? (
          readyImages
        ) : (
          <h3>No images here. Would you try to search for anything else?</h3>
        )}
      </div>
    </div>
  );
};

export default SearchImages;
