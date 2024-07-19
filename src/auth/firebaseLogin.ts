import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../auth/firebase";

export const singInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};
