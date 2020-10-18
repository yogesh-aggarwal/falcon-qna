import firebase from "firebase";
import { firebaseConfig } from "../../../environment";

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
