import React, { ReactNode, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import useHttp from "../../hooks/http";
import Pagination from "../UI/Pagination";
import ImageItem from "./ImageItem";
import { useCallback } from "react";
import { Bookmarks } from "./../../store/bookmarks";
import "../../styles/SearchImages.css";
import { AuthContext } from "../../context/authContext";

const SearchImages: React.FC = React.memo(() => {
  const [enteredQuery, setEnteredQuery] = useState("");
  const [pagination, setPagination] = useState({
    total: 1,
    current: 1,
  });
  const [readyImages, setReadyImages] = useState<null | ReactNode[]>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, data, error, sendRequest } = useHttp();

  const authContext = useContext(AuthContext);
  const { bookmarks, dispatch } = useContext(Bookmarks);

  useEffect(() => {
    if (authContext.searchState.query && !enteredQuery) {
      console.log("setting query");
      setEnteredQuery(authContext.searchState.query);
    }
    if (authContext.searchState.page) {
      console.log("setting pages");
      setPagination(prev => ({
        ...prev,
        current: authContext.searchState.page as number,
      }));
    }
  }, [
    authContext.searchState.query,
    authContext.searchState.page,
    enteredQuery,
  ]);

  const makeImages = useCallback(
    (srcArr: any[]) => {
      console.log("[in make]");
      const images = srcArr.map(img => {
        let isInBookmarks = false;
        let tags = null;
        if (bookmarks && bookmarks.length) {
          const target = bookmarks.find((b: IBookmark) => b.id === img.id);
          if (target) {
            isInBookmarks = true;
            tags = target.tags;
          }
        }
        console.log(isInBookmarks);
        const src = `https://live.staticflickr.com/${img.server}/${img.id}_${
          img.secret
        }_${"m"}.jpg`;
        const item = {
          id: img.id,
          title: img.title,
          src,
          isInBookmarks: isInBookmarks,
          tags,
        } as IBookmark;
        return (
          <ImageItem
            item={item}
            toggleBookmark={() => {
              console.log("[toggle Search]: item", item);
              item.isInBookmarks
                ? dispatch({ type: "DELETE", bookmark: item })
                : dispatch({ type: "ADD", bookmark: item });
            }}
          />
        );
      });
      setReadyImages(images);
    },
    [bookmarks, dispatch]
  );

  useEffect(() => {
    console.log("[Search useEff] data: ", data);
    if (!isLoading && !error && data) {
      makeImages(data.photos.photo);
      authContext.searchState.page = data.photos.page;
      setPagination({
        current: data.photos.page,
        total: data.photos.pages,
      });
    }
  }, [data, error, isLoading, makeImages, authContext.searchState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        inputRef.current &&
        inputRef.current.value.length !== 0 &&
        enteredQuery === inputRef.current.value
      ) {
        const query = enteredQuery;
        authContext.searchState.query = query;
        sendRequest(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=189f9704c734c2efe2932a78628553c7&text=${query}&per_page=10&page=${pagination.current}&format=json&nojsoncallback=1`,
          "GET"
        );
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [enteredQuery, sendRequest, authContext.searchState]);

  const paginateOnClick = (event: React.MouseEvent<HTMLElement>) => {
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
        className="searchInput"
        ref={inputRef}
        placeholder="Find Images"
        value={enteredQuery}
        onChange={event => setEnteredQuery(event.target.value)}
      />
      {readyImages ? (
        <div className="paginationBox">
          <Pagination
            {...pagination}
            paginationClickHandler={paginateOnClick}
          />
        </div>
      ) : null}
      <div className="resultsBox">
        {error ? (
          <h3>NSomething went wrong... :(</h3>
        ) : isLoading ? (
          <h3>Loading...</h3>
        ) : readyImages ? (
          readyImages
        ) : (
          <h3>No images here. Would you try to search for anything else?</h3>
        )}
      </div>
    </div>
  );
});

export default SearchImages;
