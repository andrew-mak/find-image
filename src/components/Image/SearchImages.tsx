import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import Pagination from "../UI/Pagination";
import ImageItem from "./ImageItem";
import { useCallback } from "react";
import { Bookmarks } from "./../../store/bookmarks";
import { AuthContext } from "../../context/authContext";
import "../../styles/SearchImages.css";

const SearchImages: React.FC = React.memo(() => {
  const { authState } = useContext(AuthContext);
  const searchContext = useContext(AuthContext).searchState;

  const [userInput, setUserInput] = useState(searchContext.query || "");
  const [
    { currentPage, totalPages, srcImages, isLoading, error },
    setSearchState,
  ] = useState({
    currentPage: searchContext.page || 1,
    totalPages: 1,
    srcImages: null as null | ImageItem[],
    isLoading: false as boolean,
    error: null as null | Error,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const { bookmarks, dispatch } = useContext(Bookmarks);

  useEffect(() => {
    const fethcData = async () => {
      let data = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=189f9704c734c2efe2932a78628553c7&text=${userInput}&per_page=10&page=${currentPage}&format=json&nojsoncallback=1`,
        { method: "GET" }
      )
        .then(response => response.json())
        .then(responseData => responseData)
        .catch(error => error);
      if (data && data.stat === "ok") {
        setSearchState({
          srcImages: data.photos.photo,
          currentPage: data.photos.page,
          totalPages: data.photos.pages,
          isLoading: false,
          error: null,
        });
      }
    };
    if (userInput.trim().length > 0) {
      fethcData();
      setSearchState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
      }));
    }
  }, [userInput, currentPage]);

  const workWithTags = useCallback(
    (tags: string[] | null, id: string) => {
      dispatch({ type: "EDIT_TAGS", tags, id });
    },
    [dispatch]
  );

  const makeImages = useCallback(
    (srcArr: ImageItem[]) => {
      const images = srcArr.map(img => {
        let isInBookmarks = false;
        if (bookmarks && bookmarks.length) {
          const target = bookmarks.find((b: IBookmark) => b.id === img.id);
          if (target) isInBookmarks = target.isInBookmarks;
        }
        const src = `https://live.staticflickr.com/${img.server}/${img.id}_${
          img.secret
        }_${"m"}.jpg`;
        const item = {
          id: img.id,
          title: img.title,
          src,
          isInBookmarks: isInBookmarks,
          tags: img.tags,
        } as IBookmark;
        return (
          <ImageItem
            item={item}
            tagsHandler={tags => workWithTags(tags, item.id)}
            toggleBookmark={() =>
              item.isInBookmarks && authState.isAuth
                ? dispatch({ type: "DELETE", bookmark: item })
                : dispatch({ type: "ADD", bookmark: item })
            }
          />
        );
      });
      return images;
    },
    [bookmarks, dispatch, authState.isAuth, workWithTags]
  );

  let imagesCards = null;
  console.log(srcImages);
  if (srcImages) {
    imagesCards = makeImages(srcImages);
  }

  useEffect(() => {
    if (!isLoading && !error && !srcImages) {
      if (searchContext.page !== null && searchContext.query) {
        setSearchState(prev => ({
          ...prev,
          currentPage: searchContext.page!,
          isLoading: true,
        }));
        setUserInput(searchContext.query);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        inputRef.current &&
        inputRef.current.value.length !== 0 &&
        userInput === inputRef.current.value
      )
        searchContext.query = userInput;
      searchContext.page = currentPage;
    }, 1000);
    return () => clearTimeout(timer);
  }, [userInput]);

  const paginateOnClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (!currentPage || !target.id) return;
    let move = 0;
    if (target.id === "toPrev" && currentPage > 1) move = -1;
    else if (target.id === "toNext" && currentPage < totalPages) {
      move = 1;
    }
    console.log("move", move);
    setSearchState(prev => ({
      ...prev,
      currentPage: prev.currentPage + move,
    }));
    console.log(target);
  };

  return (
    <div className="searchBox">
      <input
        type="text"
        className="searchInput"
        ref={inputRef}
        placeholder="Find Images"
        value={userInput}
        onChange={event => setUserInput(event.target.value)}
      />
      {imagesCards ? (
        <div className="paginationBox">
          <Pagination
            current={currentPage}
            total={totalPages}
            paginationClickHandler={paginateOnClick}
          />
        </div>
      ) : null}
      <div className="resultsBox">
        {error ? (
          <h3>NSomething went wrong... :(</h3>
        ) : isLoading ? (
          <h3>Loading...</h3>
        ) : imagesCards ? (
          imagesCards
        ) : (
          <h3>No images here. Would you try to search for anything else?</h3>
        )}
      </div>
    </div>
  );
});

export default SearchImages;
