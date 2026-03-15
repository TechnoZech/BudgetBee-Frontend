"use client";

import { auth } from "../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAppDispatch } from "../hooks/useAppSelector";
import { setUser } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const dispatch = useAppDispatch();
    const router = useRouter();

  const login = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.displayName && user.email) {
        dispatch(setUser({ name: user.displayName, email: user.email }));
        router.push("/home");
      }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  return (
    <button
      onClick={login}
      className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
    >
      Sign in with Google
    </button>
  );
}