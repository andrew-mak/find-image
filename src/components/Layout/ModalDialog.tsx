import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface ModalDialogProps {
  isOpen: boolean;
  endSession: boolean;
  countdown: number;
  onClose: () => void;
  onContinue: () => void;
  onLogout: () => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  endSession,
  countdown,
  onContinue,
  onLogout,
  onClose,
}) => {
  const cancelRef = useRef(null);

  let bodyMessage = `The current session is about to expire in ${countdown} seconds. Would
            you like to continue the session?`;
  if (endSession) bodyMessage = ` Your current session has timed out.`;

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Session Timeout</AlertDialogHeader>
          <AlertDialogBody>{bodyMessage}</AlertDialogBody>
          <AlertDialogFooter>
            {endSession ? (
              <Button ref={cancelRef} colorScheme="blue" onClick={onLogout}>
                OK
              </Button>
            ) : (
              <>
                <Button ref={cancelRef} colorScheme="blue" onClick={onContinue}>
                  Continue Session
                </Button>
                <Button colorScheme="red" ml={3} onClick={onLogout}>
                  Logout
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ModalDialog;
