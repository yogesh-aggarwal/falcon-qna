import { auth } from "../firebase/firebase";
import app from "firebase/app";
import { UserState } from "../state/userState";

export class AuthService {
  static async fetchUser() {
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      UserState.setState({
        id: user.uid,
        ladoo: 400,
        profileImg: user.photoURL || "",
        name: user.displayName || "",
        email: user.email || "",
        isSuspended: false,
      });
    });
  }

  static async signIn() {
    const contextProvider = new app.auth.GoogleAuthProvider();

    let user = await auth.signInWithPopup(contextProvider);
    console.log(user.user);
  }

  static async signOut() {
    await auth.signOut();
  }
}
