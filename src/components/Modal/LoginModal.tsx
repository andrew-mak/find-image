import React from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import Auth from "../AuthForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent p="28px">
          <ModalCloseButton />
          <Auth
            action={"login"}
            type="modal"
            showWarning={true}
            onCloseModal={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
