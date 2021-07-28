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
  Wrap,
} from "@chakra-ui/react";
import { ImCross } from "react-icons/im";

const SearchImages: React.FC = React.memo(() => {
  const { isAuth, lastSearch, setLastSearch } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const fethcData = async () => {
    let data = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=189f9704c734c2efe2932a78628553c7&text=${userInput}&per_page=10&page=${currentPage}&format=json&nojsoncallback=1`,
      { method: "GET" }
    )
      .then(response => response.json())
      .then(responseData => responseData)
      .catch(error => {
        console.log(error);
        setSearchState({
          srcImages: null,
          isLoading: false,
          currentPage: 1,
          totalPages: 1,
          error: error.message,
        });
      });

    if (data && data.stat === "ok") {
      setSearchState({
        srcImages: data.photos.photo.length === 0 ? null : data.photos.photo,
        currentPage: data.photos.page,
        totalPages: data.photos.pages,
        isLoading: false,
        error: null,
      });
      setLastSearch(data.photos.page, userInput);
    }
  };

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
            restrictions={!isAuth}
            btnCaption={caption}
            tagsHandler={tags => workWithTags(tags, item.id)}
            toggleBookmark={item => toggleBookmarkHandler(item)}
          />
        );
      });
      return images;
    },
    [bookmarks, isAuth, workWithTags]
  );

  let imagesCards = null;
  if (srcImages && srcImages.length !== 0) imagesCards = makeImages(srcImages);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (userInput.trim().length === 0) {
      setSearchState({
        srcImages: null,
        isLoading: false,
        currentPage: 1,
        totalPages: 1,
        error: null,
      });
      setLastSearch(1, "");
    }
    if (userInput.trim().length > 0 && currentPage !== lastSearch.page) {
      fethcData();
    }
    if (userInput.trim().length > 0) {
      timer = setTimeout(() => {
        if (userInput.trim().length > 0) {
          fethcData();
          setSearchState(prev => ({
            ...prev,
            isLoading: true,
            error: null,
          }));
        }
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [userInput, currentPage]);

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

  const toggleBookmarkHandler = (item: ImageItem) => {
    if (isAuth) {
      item.isInBookmarks
        ? dispatch({ type: "DELETE", bookmark: item })
        : dispatch({ type: "ADD", bookmark: item });
    } else {
      onOpen();
    }
  };

  return (
    <Flex w="100%" ml="64px" p="16px 10px" flexDir="column">
      <Flex flexDirection="column" width="100%">
        <Flex
          width={["100%", "90%", "80%"]}
          alignSelf="center"
          alignItems="flex-end"
        >
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
            pr="4.5rem"
            type="text"
            onChange={event => setUserInput(event.target.value)}
          />
          <Button
            bgColor="transparent"
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
          <Flex>
            <Heading as="h3">Something went wrong... :(</Heading>
            <Text>error</Text>
          </Flex>
        ) : isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : imagesCards ? (
          imagesCards
        ) : (
          <Text>
            No images found. Would you try to search for anything else?
          </Text>
        )}
      </Wrap>
      <LoginModal onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
});

export default SearchImages;
