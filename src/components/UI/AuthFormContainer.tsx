import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

type AuthFormContainerProps = {
  action: "login" | "register";
};

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  children,
  action,
}) => {
  return (
    <Flex w="100%" pl="64px">
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
          {action ? (
            <Heading
              color="white"
              fontWeight="normal"
              size="lg"
              alignSelf="center"
              m="auto"
              textTransform="capitalize"
            >
              {action}
            </Heading>
          ) : null}
        </Flex>
        <Flex px={["32px", "20%"]} w="100%" flexDirection="column">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AuthFormContainer;
