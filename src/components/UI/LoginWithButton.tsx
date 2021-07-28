import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

function LoginWithButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      onClick={() => loginWithRedirect()}
      colorScheme="green"
      size="md"
      variant="outline"
      whiteSpace="pre-wrap"
      fontWeight="normal"
    >
      Login with Evernote (*experimental mode)
    </Button>
  );
}

export default LoginWithButton;
