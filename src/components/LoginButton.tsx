import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button onClick={() => loginWithRedirect()} colorScheme="green" size="lg" variant="outline" >
      Login with Evernote
    </Button>
  );
}

export default LoginButton;
