"use client";

import { Provider } from "./store";
import { store } from "./store";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, logout } from "./store/slices/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppSelector";
import "./globals.css";
import Navbar from "./components/Navigation";
import { Toaster } from "react-hot-toast";

function AuthLoader({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth!, async (firebaseUser) => {
			try {
				if (firebaseUser) {
					// 🔥 1. Get Firebase token
					const firebaseToken = await firebaseUser.getIdToken();

					// 🔥 2. Send to backend
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ token: firebaseToken }),
						}
					);

					const data = await res.json();

					// 🔥 3. Store JWT in localStorage
					localStorage.setItem("token", data.token);

					// 🔥 4. Store user in Redux (WITH ID)
					dispatch(
						setUser({
							id: data.user._id,
							name: data.user.name,
							email: data.user.email,
							photo: data.user.photo,
						})
					);
				} else {
					// 🔥 Logout case
					localStorage.removeItem("token");
					dispatch(logout());
				}
			} catch (err) {
				console.error("Auth error:", err);
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<>
			<Navbar />
			{children}
		</>
	);
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Provider store={store}>
			<html lang="en">
				<body>
					<Toaster position="top-center" />
					<AuthLoader>{children}</AuthLoader>
				</body>
			</html>
		</Provider>
	);
}