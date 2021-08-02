import React, { useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import IdleTimer from "react-idle-timer";
import { AppUserContext } from "../context/userContext";
import ModalDialog from "./Layout/ModalDialog";

let countdownInterval: NodeJS.Timeout, timeout: NodeJS.Timeout;

const SessionTimeout: React.FC = () => {
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);
  const [endSession, setEndSession] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, logout } = useContext(AppUserContext).auth;

  const onActive = () => {
    if (!isOpen) {
      clearTimers();
      setEndSession(false);
    }
  };

  const clearTimers = () => {
    clearTimeout(timeout);
    clearInterval(countdownInterval);
  };

  const handleLogout = (isTimeout = false) => {
    setEndSession(false);
    clearTimers();
    logout();
    onClose();
  };

  const handleContinue = () => {
    clearTimers();
    onClose();
  };

  const onIdle = () => {
    const delay = 1000 * 5; // 5 seconds for demonstration purposes
    if (isAuth && !isOpen) {
      timeout = setTimeout(() => {
        let countDown = 60;
        onOpen();
        setTimeoutCountdown(countDown);
        countdownInterval = setInterval(() => {
          if (countDown > 0) {
            setTimeoutCountdown(--countDown);
          } else {
            setEndSession(true);
            clearTimers();
          }
        }, 1000);
      }, delay);
    }
  };

  return (
    <>
      <IdleTimer
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={5000}
      />
      <ModalDialog
        isOpen={isOpen}
        endSession={endSession}
        countdown={timeoutCountdown}
        onClose={onClose}
        onContinue={handleContinue}
        onLogout={handleLogout}
      />
    </>
  );
};

export default SessionTimeout;
