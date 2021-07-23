type AuthContextType = {
  isAuth: boolean,
  login: () => void,
}

interface IAuth {
  login: () => void,
  isAuth: boolean;
}