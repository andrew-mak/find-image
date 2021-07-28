export const mapErrorMessages = (error: string): string | null => {
  switch (error) {
    case 'INVALID_PASSWORD': return "The password is invalid or the user does not have a password."
    case 'INVALID_EMAIL': return "The email address is missing or badly formatted."
    case 'EMAIL_NOT_FOUND': return "Email not found. There is no user record corresponding to this identifier.The user may have been deleted."
    case 'EMAIL_EXISTS': return "The email address is already in use by another account.";
    case 'MISSING_EMAI': return "Please, enter email.";
    case 'MISSING_PASSWORD': return "Please, enter password.";
    case 'WEAK_PASSWORD : Password should be at least 6 characters': return "Weak password: Password should be at least 6 characters."
    case 'OPERATION_NOT_ALLOWED': return "Password sign -in is disabled for this project. Operation not allowed.";
    case 'TOO_MANY_ATTEMPTS_TRY_LATER': return "We have blocked all requests from this device due to unusual activity. Try again later.";
    case 'USER_DISABLED': return "The user account has been disabled by an administrator."
    case 'CONFIRM_PASSWORD': return "Passwords don't match."
    default: return "Something go wrong, please try again."
  }
};