import { initializeApp, firestore as _firestore } from "firebase";
import { firebaseConfig } from "../../../environment";

initializeApp(firebaseConfig);

export const firestore = _firestore();
