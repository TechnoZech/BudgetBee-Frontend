"use client";

import { useEffect } from "react";
import Button from "./components/Button";
import { useAppSelector } from "./hooks/useAppSelector";
import { useRouter } from "next/navigation";

export default function LandingPage() {
	const user = useAppSelector((state) => state.auth.user);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/home");
		}
	}, [router, user]);

	if (user === undefined) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
				<p className="text-gray-700 dark:text-gray-300">Checking user...</p>
			</div>
		);
	}

	if (user === null) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
				<div className="flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold mb-8">Welcome to BudgetBee</h1>
					<Button text="Login" url="/login" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
			<p className="text-gray-700 dark:text-gray-300">Checking user...</p>
		</div>
	);
}
