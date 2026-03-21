"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../hooks/useAppSelector";
import { setUser } from "../store/slices/authSlice";

export default function GoogleButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth!, provider);

      const firebaseUser = result.user;

      const firebaseToken = await firebaseUser.getIdToken();

      const baseURL = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${baseURL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: firebaseToken }),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token);
      
      dispatch(
        setUser({
          name: data.user.name,
          email: data.user.email,
          photo: data.user.photo,
        })
      );

      router.push("/home");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={login}
      className="px-6 py-3 bg-black text-white rounded-lg"
    >
      Sign in with Google
    </button>
  );
}