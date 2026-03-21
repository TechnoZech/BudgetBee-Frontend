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
				}),
			);

			router.push("/home");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<button
			onClick={login}
			className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
		>
			{/* Google Icon */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 48 48"
				className="w-5 h-5"
			>
				<path
					fill="#FFC107"
					d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.5 6.1 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
				/>
				<path
					fill="#FF3D00"
					d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.5 6.1 28.9 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
				/>
				<path
					fill="#4CAF50"
					d="M24 44c5.2 0 9.9-2 13.4-5.3l-6.2-5.1C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
				/>
				<path
					fill="#1976D2"
					d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3 5.2-5.8 6.6l6.2 5.1C39.5 36.5 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z"
				/>
			</svg>

			<span>Sign in with Google</span>
		</button>
	);
}
