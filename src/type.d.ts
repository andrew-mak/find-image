type AuthContext = {
  isAuth: boolean,
  login: () => void,
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
