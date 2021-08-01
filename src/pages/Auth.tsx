import React from "react";
import AuthForm from "../components/AuthForm";
import { Flex, Heading } from "@chakra-ui/react";

type AuthProp = {
  action: "login" | "register";
  redirect: string;
};

const Auth: React.FC<AuthProp> = ({ action, redirect }) => {
  return (
    <Flex w="100%">
      <Flex
        w={["100%", "85%", "60%", "45%"]}
        height="fit-content"
        mx="auto"
        mt={["8px", "24px", "48px"]}
        pb="20px"
        bg="white"
        flexDirection="column"
        border="1px solid #496579"
        borderBottom="2px solid #496579"
        borderRadius="sm"
      >
        <Flex
          bg="#282c34"
          py="4px"
          my="32px"
          height={action ? "unset" : "20px"}
          width="fit-content"
          ml="auto"
          px="64px"
        >
          <Heading
            color="white"
            fontWeight="normal"
            size="lg"
            alignSelf="center"
            m="auto"
            textTransform="capitalize"
          >
            Join to FindImager
          </Heading>
        </Flex>
        <Flex px={["32px", "20%"]} w="100%" flexDirection="column">
          <AuthForm
            action="login"
            redirect={redirect}
            type="page"
            showWarning={true}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Auth;
