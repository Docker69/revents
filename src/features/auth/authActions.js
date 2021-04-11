import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

export function signInUser(payload) {
  console.log("==> signInUser");
  console.log(payload);
  return {
    type: SIGN_IN_USER,
    payload,
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
