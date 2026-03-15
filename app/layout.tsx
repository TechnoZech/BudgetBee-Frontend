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

function AuthLoader({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth!, (user) => {
			if (user) {
				dispatch(
					setUser({
						name: user.displayName || "",
						email: user.email || "",
					}),
				);
			} else {
				dispatch(logout());
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
					<Navbar />
					<AuthLoader>{children}</AuthLoader>
				</body>
			</html>
		</Provider>
	);
}
