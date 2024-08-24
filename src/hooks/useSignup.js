import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, username, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res.user) {
        throw new Error("Could not complete signup");
      }

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const thumbnailRef = ref(storage, uploadPath);

      await uploadBytes(thumbnailRef, thumbnail);
      const imageUrl = await getDownloadURL(thumbnailRef);

      const userDocRef = doc(db, "users", res.user.uid);
      await setDoc(
        userDocRef,
        {
          uid: res.user.uid,
          online: true,
          email: res.user.email,
          displayName: username,
          photoURL: imageUrl,
          createdAt: new Date(),
        },
        { merge: true }
      );

      await updateProfile(res.user, {
        displayName: username,
        photoURL: imageUrl,
      });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(false);
  }, []);

  return { signup, error, isPending };
};
