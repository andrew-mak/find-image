import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LoginButton from "./LoginButton";
import AuthFormContainer from "./UI/AuthFormContainer";

type AuthProps = {
  action: "login" | "register";
  showWarning?: boolean;
};

const Auth: React.FC<AuthProps> = ({ action, showWarning }) => {
  const { isAuth, auth, userData } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    isLoading: false,
    error: null,
  });
  const [authWay, setAuthWay] = useState(action || "login");
  const { push } = useHistory();

  useEffect(() => {
    if (isAuth) push("/bookmarks");
  }, [isAuth, push]);

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    userData.email = formState.email;
    if (formState.email.trim() && formState.password.trim()) {
      const data = {
        email: formState.email,
        name: formState.name,
        password: formState.password,
        returnSecureToken: true,
      };
      auth(data, authWay);
      setFormState(prev => ({ ...prev, isLoading: true, error: null }));
    }
  };

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.name === "email")
      setFormState(prev => ({ ...prev, email: target.value }));
    else if (target.name === "password")
      setFormState(prev => ({ ...prev, password: target.value }));
    else if (target.name === "name")
      setFormState(prev => ({ ...prev, name: target.value }));
  };

  const changeAuthWay = () => {
    setAuthWay(prev => (prev === "login" ? "register" : "login"));
  };

  return (
    <AuthFormContainer action={authWay}>
      <form>
        <Stack>
          {showWarning ? (
            <>
              <Heading size="md">You are not authenticated! </Heading>
              <Text> Please log in to continue.</Text>
            </>
          ) : null}

          {authWay === "register" ? (
            <FormControl id="name" isRequired>
              <FormLabel>Display name</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Enter name"
                onChange={onInputChanged}
                value={formState.name}
                size="sm"
              />
            </FormControl>
          ) : null}

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={onInputChanged}
              value={formState.email}
              size="sm"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={onInputChanged}
              value={formState.password}
              size="sm"
            />
          </FormControl>
          <Flex py="20px">
            <Button
              type="submit"
              onClick={event => loginHandler(event)}
              colorScheme="blue"
              fontWeight="normal"
              fontSize="1.1rem"
              textTransform="capitalize"
              isLoading={formState.isLoading}
            >
              {authWay}
            </Button>

            <Button
              ml="auto"
              variant="outline"
              borderWidth="1px"
              onClick={changeAuthWay}
              colorScheme="orange"
              fontWeight="normal"
              fontSize="1.1rem"
            >
              or {authWay === "login" ? "Register" : "Login"}
            </Button>
          </Flex>

          <Divider />
          <LoginButton />
        </Stack>
      </form>
    </AuthFormContainer>
  );
};

export default Auth;

// const loginWithPocketHandler = () => {
//   let code = "";
//   const url = "https://getpocket.com/v3/oauth/request";
//   const body = {
//     consumer_key: process.env.POCKET_CONSUMER_KEY,
//     redirect_uri: process.env.REDIRECT_URI,
//   };
//   postData(url, body).then((data: any) => {
//     if (!data) return;
//     localStorage.setItem("request_token_pocket", code);
//     code = data;
//     console.log(data); // JSON data parsed by `response.json()` call
//     window.location.replace(
//       `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${process.env.REDIRECT_URI}`
//     );
//   });
//   // authContext.authState.login();
// };
