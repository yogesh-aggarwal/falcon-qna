import app from "firebase/app";
import { firestore as _firestore } from "firebase";
import { firebaseConfig } from "../../../environment";

app.initializeApp(firebaseConfig);

export const firestore = _firestore();
export const auth = app.auth();
