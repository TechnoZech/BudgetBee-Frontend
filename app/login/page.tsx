"use client";

import GoogleButton from "../components/GoogleButton";

export default function Login() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-5">
			<h1 className="text-2xl font-bold">Login page for BudgetBee</h1>
			<GoogleButton />
		</div>
	);
}
