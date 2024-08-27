import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { auth, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, username, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user) {
        throw new Error("Could not complete signup");
      }

      const uploadPath = `thumbnails/${userCredential.user.uid}/${thumbnail.name}`;
      const thumbnailRef = ref(storage, uploadPath);

      await uploadBytes(thumbnailRef, thumbnail);
      const imageUrl = await getDownloadURL(thumbnailRef);

      // await setDoc(doc(db, "users", userCredential.user.uid), {
      //   uid: userCredential.user.uid,
      //   online: true,
      //   email: userCredential.user.email,
      //   displayName: username,
      //   photoURL: imageUrl,
      //   createdAt: new Date(),
      // });

      await updateProfile(userCredential.user, {
        displayName: username,
        photoURL: imageUrl,
      });

      dispatch({ type: "LOGIN", payload: userCredential.user });

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
