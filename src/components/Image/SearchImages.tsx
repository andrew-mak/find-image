import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import Pagination from "../UI/Pagination";
import ImageItem from "./ImageItem";
import { useCallback } from "react";
import { Bookmarks } from "./../../store/bookmarks";
import { AuthContext } from "../../context/authContext";
import { Flex, Input, Wrap } from "@chakra-ui/react";

const SearchImages: React.FC = React.memo(() => {
  const { isAuth, lastSearch, setLastSearch } = useContext(AuthContext);

  const [userInput, setUserInput] = useState(lastSearch.query || "");
  const [
    { currentPage, totalPages, srcImages, isLoading, error },
    setSearchState,
  ] = useState({
    currentPage: lastSearch.page || 1,
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
        let colScheme = "blue";
        let caption = "Bookmark it";
        if (!isAuth) colScheme = "gray";
        if (isAuth && isInBookmarks) {
          caption = "Delete";
          colScheme = "red";
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
            key={item.id}
            item={item}
            colScheme={colScheme}
            btnCaption={caption}
            tagsHandler={tags => workWithTags(tags, item.id)}
            toggleBookmark={item => toggleBookmarkHandler(item)}
          />
        );
      });
      return images;
    },
    [bookmarks, dispatch, isAuth, workWithTags]
  );

  let imagesCards = null;
  console.log(srcImages);
  if (srcImages) {
    imagesCards = makeImages(srcImages);
  }

  useEffect(() => {
    if (!isLoading && !error && !srcImages) {
      if (lastSearch.page !== null && lastSearch.query) {
        setSearchState(prev => ({
          ...prev,
          currentPage: lastSearch.page!,
          isLoading: true,
        }));
        setUserInput(lastSearch.query);
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
        setLastSearch(currentPage, userInput);
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

  const toggleBookmarkHandler = (item: ImageItem) => {
    if (isAuth) {
      item.isInBookmarks
        ? dispatch({ type: "DELETE", bookmark: item })
        : dispatch({ type: "ADD", bookmark: item });
    }
  };

  return (
    <Flex w="100%" ml="64px" p="16px 10px" flexDir="column">
      <Flex flexDirection="column">
        <Input
          variant="outline"
          w="90%"
          mt="12px"
          size="sm"
          alignSelf="center"
          ref={inputRef}
          autoFocus={true}
          placeholder="Find Images"
          value={userInput}
          onChange={event => setUserInput(event.target.value)}
        />
        {imagesCards ? (
          <Flex alignSelf="center">
            <Pagination
              current={currentPage}
              total={totalPages}
              paginationClickHandler={paginateOnClick}
            />
          </Flex>
        ) : null}
      </Flex>
      <Wrap spacing="30px" py="60px" justify="center">
        {error ? (
          <h3>NSomething went wrong... :(</h3>
        ) : isLoading ? (
          <h3>Loading...</h3>
        ) : imagesCards ? (
          imagesCards
        ) : (
          <h3>No images here. Would you try to search for anything else?</h3>
        )}
      </Wrap>
    </Flex>
  );
});

export default SearchImages;
