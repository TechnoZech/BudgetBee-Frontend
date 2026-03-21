"use client";

import { useEffect } from "react";
import Button from "../components/Button";
import { useAppSelector } from "../hooks/useAppSelector";
import { useRouter } from "next/navigation";
import Transactions from "../components/Transactions";

export default function Home() {
	const router = useRouter();
	const user = useAppSelector((state) => state.auth.user);

	useEffect(() => {
		if (!user) {
			router.push("/");
		}
	}, [user, router]);

	if (!user) {
		return null;
	}

	return (
		<div className="flex min-h-screen flex-col justify-center bg-zinc-50 font-sans dark:bg-black text-center p-4">
			<div className="absolute top-30 right-8">
				<Button text="+ Transactions" url="/addTransactions" className="mt-4" />
			</div>
			<Transactions />
		</div>
	);
}
