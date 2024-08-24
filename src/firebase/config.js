import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAD4ZzCJ5JxlhhbO1H7kM5O9ZZkbrgtY0I",
  authDomain: "managesite-478e5.firebaseapp.com",
  projectId: "managesite-478e5",
  storageBucket: "managesite-478e5.appspot.com",
  messagingSenderId: "186916338749",
  appId: "1:186916338749:web:f5c730a09fd9192051be54",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
