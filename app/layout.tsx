"use client";
import { Provider, store } from "./store";
import { ReactNode } from "react";
import "./globals.css";
import Navigation from "./components/Navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<html lang="en">
				<body>
					<Navigation />
					{children}
				</body>
			</html>
		</Provider>
	);
}
