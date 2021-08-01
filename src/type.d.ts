type AuthContext = {
  isAuth: boolean,
  login: () => void,
}

interface IUserState {
  isAuth: boolean,
  authError: string | null,
  logout: ()=>void,
  auth: (d: AuthData, a: "login" | "register") => void,
  setLastSearch: (p: number, q: string, pp: number) => void;
  userData: {
    userName: null | string,
    email: null | string,
    token: null | string,
  },
  lastSearch: {
    query: null | string,
    page: null | number,
    perPage: number,
  },
}

type AuthData = {
  name?: string;
  email: string;
  password: string;
  returnSecureToken: boolean;
};

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

type ResponseFlickrPhotos = {
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
