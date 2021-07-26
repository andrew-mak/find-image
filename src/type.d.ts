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
  id?: string;
  tags?: string[] | null;
};

type ResponseData = {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: [];
}

type ImageItem = {
  id: string;
  title: string;
  server: string;
  secret: string;
  isInBookmarks: boolean;
  tags: Tag[];
};

type DispatchBookmarks = (action: BookmarksAction) => void;

interface IBookmark extends ImageItem {
  src: string;
}

type ImageAction = {
  [key: string]: Function;
};

type HttpActionKind = "SEND" | "RESPONSE" | "ERROR" | "CLEAR";
type BookmarkActionKind = "SET" | "ADD" | "EDIT_TAGS" | "DELETE";
