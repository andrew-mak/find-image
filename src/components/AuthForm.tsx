import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AppUserContext } from "../context/userContext";
import LoginWithButton from "./UI/LoginWithButton";

type IAuthFormProps = {
  action: "login" | "register";
  type: "page" | "modal";
  redirect?: string;
  showWarning?: boolean;
  onCloseModal?: () => void;
};

const AuthForm: React.FC<IAuthFormProps> = ({
  action,
  showWarning,
  type,
  redirect,
  onCloseModal,
}) => {
  const { isAuth, authError, authenticate } = useContext(AppUserContext).auth;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    isLoading: false,
    error: null as null | string,
  });
  const [authWay, setAuthWay] = useState(action || "login");
  const { push } = useHistory();
  const toast = useToast();

  useEffect(() => {
    if (isAuth) {
      if (type === "modal" && onCloseModal) {
        onCloseModal();
      } else push(redirect ? redirect : "/");
      toast({
        status: "info",
        variant: "left-accent",
        position: "top",
        title: `Authorization success.`,
        isClosable: true,
      });
    }
  }, [isAuth, type, redirect, toast, push, onCloseModal]);

  useEffect(() => {
    if (authError) {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        error: authError,
      }));
    }
  }, [authError]);

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (formState.email.trim() && formState.password.trim()) {
      const data = {
        email: formState.email,
        displayName: formState.name,
        password: formState.password,
        returnSecureToken: true,
      };
      authenticate(data, authWay);
      setFormState(prev => ({ ...prev, isLoading: true, error: null }));
    }
  };

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.name === "email")
      setFormState(prev => ({
        ...prev,
        email: target.value,
        error: null,
        isLoading: false,
      }));
    else if (target.name === "password")
      setFormState(prev => ({
        ...prev,
        password: target.value,
        error: null,
        isLoading: false,
      }));
    else if (target.name === "name")
      setFormState(prev => ({
        ...prev,
        name: target.value,
        error: null,
        isLoading: false,
      }));
  };

  const changeAuthWay = () => {
    setAuthWay(prev => (prev === "login" ? "register" : "login"));
  };

  return (
    <form>
      <Stack>
        {showWarning ? (
          <>
            <Heading size="md">You are not authenticated.</Heading>
            <Text> Please login to continue.</Text>
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
        {formState.error ? <Box color="red.600">{formState.error}</Box> : null}
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
        <LoginWithButton />
      </Stack>
    </form>
  );
};

export default AuthForm;
