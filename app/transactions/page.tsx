"use client";

import { useEffect } from "react";
import { LiaPlusSolid } from "react-icons/lia";
import { useAppSelector, useAppDispatch } from "../hooks/useAppSelector";
import { useRouter } from "next/navigation";
import Transactions from "../components/Transactions";
import Link from "next/link";
import { fetchTransactions } from "../store/slices/transactionSlice";


export default function Transaction() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.auth.user);
	const fetched = useAppSelector((state) => state.transaction.fetched);

	useEffect(() => {
		if (!user) {
			router.push("/");
		}
	}, [user, router]);

	useEffect(() => {
		if (!fetched) {
			dispatch(fetchTransactions());
		}
	}, [fetched, dispatch]);

	if (!user) {
		return null;
	}



	return (
		<div className="flex min-h-screen flex-col justify-center bg-zinc-50 font-sans dark:bg-black text-center p-4">
			<div className="absolute bottom-10 right-10 p-2 rounded-full border border-yellow-400 bg-yellow-300 hover:bg-yellow-400 text-black transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white">
				<Link href={"/addTransactions"}>
					<LiaPlusSolid className="w-7 h-7" />
				</Link>
			</div>
			<Transactions />
		</div>
	);
}
