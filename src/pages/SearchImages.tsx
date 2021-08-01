import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { AuthContext } from "../context/authContext";
import { Bookmarks } from "../store/bookmarks";
import Pagination from "../components/UI/Pagination";
import ImageItem from "../components/Image/ImageItem";
import LoginModal from "../components/Modal/LoginModal";
import {
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { ImCross } from "react-icons/im";

const SearchImages: React.FC = React.memo(() => {
  const { isAuth, lastSearch, setLastSearch } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [userInput, setUserInput] = useState(lastSearch.query || "");
  const [
    { currentPage, perPage, totalPages, srcImages, isLoading, error },
    setSearchState,
  ] = useState({
    currentPage: lastSearch.page || 1,
    totalPages: 1,
    perPage: 10,
    srcImages: null as null | ImageItem[],
    isLoading: false as boolean,
    error: null as null | string,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const { bookmarks, dispatch } = useContext(Bookmarks);

  const handleError = useCallback((message: string) => {
    setSearchState({
      srcImages: null,
      isLoading: false,
      currentPage: 1,
      totalPages: 1,
      perPage: 10,
      error: message,
    });
  }, []);

  const fethcData = useCallback(async () => {
    setSearchState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));
    let data = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=189f9704c734c2efe2932a78628553c7&text=${userInput}&per_page=${perPage}&page=${currentPage}&format=json&nojsoncallback=1`,
      { method: "GET" }
    )
      .then(response => response.json())
      .then(responseData => responseData)
      .catch(error => {
        console.error(error);
        handleError(error.message);
      });

    if (data && data.stat === "ok") {
      setSearchState({
        srcImages: data.photos.photo.length === 0 ? null : data.photos.photo,
        currentPage: data.photos.page,
        totalPages: data.photos.pages,
        perPage: data.photos.perpage,
        isLoading: false,
        error: null,
      });
      setLastSearch(data.photos.page, userInput, data.photos.perpage);
    } else {
      console.error("Something go wrong. Responce data: ", data);
      handleError("Something go wrong");
    }
  }, [currentPage, userInput, perPage, setLastSearch, handleError]);

  const toggleBookmarkHandler = useCallback(
    (item: ImageItem) => {
      if (isAuth) {
        if (item.isInBookmarks) {
          dispatch({ type: "DELETE", bookmark: item });
          toast({
            title: `Deleted from bookmarks`,
            variant: "subtle",
            status: "info",
            isClosable: true,
            duration: 2000,
            position: "bottom-right",
          });
        } else {
          dispatch({ type: "ADD", bookmark: item });
          toast({
            title: `Added in bookmarks`,
            variant: "subtle",
            status: "success",
            isClosable: true,
            duration: 2000,
            position: "bottom-right",
          });
        }
      } else {
        onOpen();
      }
    },
    [isAuth, toast, dispatch, onOpen]
  );

  const handleTagsActions = useCallback(
    (tags: string[] | null, id: string) => {
      dispatch({ type: "EDIT_TAGS", tags, id });
    },
    [dispatch]
  );

  const perpageHandler = (value: string) => {
    setSearchState(prev => ({
      ...prev,
      perPage: parseInt(value),
    }));
  };

  const makeImageCard = useCallback(
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
            restrictions={!isAuth}
            btnCaption={caption}
            tagsHandler={tags => handleTagsActions(tags, item.id)}
            toggleBookmark={item => toggleBookmarkHandler(item)}
          />
        );
      });
      return images;
    },
    [bookmarks, isAuth, handleTagsActions, toggleBookmarkHandler]
  );

  let imagesCards = null;
  if (srcImages && srcImages.length !== 0)
    imagesCards = makeImageCard(srcImages);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    // case: when search input became empty
    if (userInput.trim().length === 0) {
      setSearchState(prev => ({
        ...prev,
        srcImages: null,
        isLoading: false,
        currentPage: 1,
        totalPages: 1,
        error: null,
      }));
      setLastSearch(1, "", 10);
    }
    // case: when user make paginate step or change perpage prop
    else if (
      userInput.trim().length > 0 &&
      (currentPage !== lastSearch.page || perPage !== lastSearch.perPage)
    ) {
      fethcData();
    }
    // case: when search query changed by user
    else if (userInput.trim().length > 0 && userInput !== lastSearch.query) {
      timer = setTimeout(() => {
        if (userInput.trim().length > 0) {
          fethcData();
        }
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [
    userInput,
    currentPage,
    perPage,
    lastSearch.page,
    lastSearch.perPage,
    lastSearch.query,
    fethcData,
    setLastSearch,
  ]);

  useEffect(() => {
    if (!isLoading && !error && !srcImages) {
      // case: on component first mount try to set last users query
      if (lastSearch.page !== null && lastSearch.query) {
        setSearchState(prev => ({
          ...prev,
          currentPage: lastSearch.page!,
          isLoading: true,
        }));
        setUserInput(lastSearch.query);
        fethcData();
      }
    }
  }, [
    error,
    isLoading,
    lastSearch.page,
    lastSearch.query,
    srcImages,
    fethcData,
  ]);

  const paginateOnClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (!currentPage || !target.id) return;
    let move = 0;
    if (target.id === "toPrev" && currentPage > 1) move = -1;
    else if (target.id === "toNext" && currentPage < totalPages) {
      move = 1;
    }
    setSearchState(prev => ({
      ...prev,
      currentPage: prev.currentPage + move,
    }));
  };

  return (
    <>
      <Flex
        width="100%"
        maxW="1280px"
        flexDirection="column"
        alignSelf="center"
        mb="4px"
        py="8px"
      >
        <Flex
          width="100%"
          pb="12px"
          alignSelf="center"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Input
            variant="outline"
            w="90%"
            mt="12px"
            size="sm"
            alignSelf="center"
            boxShadow="0px 0px 5px -2px black"
            ref={inputRef}
            autoFocus={true}
            placeholder="Find images"
            value={userInput}
            type="text"
            onChange={event => setUserInput(event.target.value)}
          />
          <Button
            bgColor="transparent"
            textShadow="0px 0px 5px black"
            _active={{ outline: "none" }}
            _focus={{ outlineWidth: "none" }}
            _focusVisible={{ boxShadow: "0px 0px 0px px #282c34" }}
            size="sm"
            onClick={() => setUserInput("")}
          >
            <ImCross />
          </Button>
        </Flex>
        {imagesCards ? (
          <Flex alignSelf={["center", "flex-end"]} pr={[0, 0, "7%", "7%"]}>
            <Pagination
              current={currentPage}
              total={totalPages}
              paginationClickHandler={paginateOnClick}
              perpageHandler={perpageHandler}
            />
          </Flex>
        ) : !error && !isLoading ? (
          <Text alignSelf="flex-start" ml={[0, "3%", "4%"]}>
            No images found. Would you try to search for anything else?
          </Text>
        ) : null}
      </Flex>
      {error ? (
        <Flex alignSelf="center">
          <Heading as="h3">Something went wrong... :(</Heading>
          <Text>error</Text>
        </Flex>
      ) : isLoading ? (
        <Spinner
          mt="16px"
          alignSelf="center"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : imagesCards ? (
        <Wrap
          spacing="30px"
          py="60px"
          justify="center"
          overflowX="hidden"
          overflowY="auto"
        >
          {imagesCards}
        </Wrap>
      ) : null}
      <LoginModal onClose={onClose} isOpen={isOpen} />
    </>
  );
});

export default SearchImages;
