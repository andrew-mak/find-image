type AuthContext = {
  isAuth: boolean,
  login: () => void,
}

type userState = {
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

type httpActions = {
  type: httpActionKind;
  responseData?: any;
  errorMessage?: string;
};

type httpState = {
  loading: bool,
  error?: string | null,
  data?: any,
};

type httpActionKind = "SEND" | "RESPONSE" | "ERROR" | "CLEAR";
