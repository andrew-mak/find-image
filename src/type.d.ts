type AuthContext = {
  isAuth: boolean,
  login: () => void,
}

type UserState = {
  authState: {
    isAuth: boolean,
    user: null | string,
    token: null | string,
    login: () => void,
  },
  searchState: {
    query: null | string,
    page: null | number,
  },
}

type HttpActions = {
  type: httpActionKind;
  responseData?: any;
  errorMessage?: string;
};

type HttpState = {
  loading: bool,
  error?: string | null,
  data?: any,
};

type BookmarksAction = {
  type: BookmarkActionKind;
  bookmark?: ImageItem;
  data?: any;
};

// type BookmarksState = IBookmark[];

// interface Bookmarks {
//   bookmarks: IBookmark[];
//   dispatch?: React.Dispatch<Action>;
// }

type ImageItem = {
  id: string;
  title: string;
  isInBookmarks: boolean;
  tags: string[] | null;
};

type DispatchBookmarks = (action: BookmarksAction) => void;

interface IBookmark extends ImageItem {
  src: string;
}

type ImageAction = {
  [key: string]: Function;
};

type HttpActionKind = "SEND" | "RESPONSE" | "ERROR" | "CLEAR";
type BookmarkActionKind = "SET" | "ADD" | "DELETE";
