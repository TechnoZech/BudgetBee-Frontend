"use client";

import React, { useEffect, useState } from "react";
import { apiFetch } from "../config/api";
import { categoryIcons } from "../utils/categoryIcons";

interface Transaction {
	title: string;
	amount: number;
	date: string;
	category: string;
	type: boolean; // true = credit, false = debit
}

const Transactions = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [totalExpense, setTotalExpense] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const response = await apiFetch("/transactions", {
					method: "GET",
				});
				const data = await response.json();
				setTransactions(data);

				// Calculate total expense and income
				const expense = data
					.filter((t: Transaction) => !t.type)
					.reduce((sum: number, t: Transaction) => sum + t.amount, 0);
				const income = data
					.filter((t: Transaction) => t.type)
					.reduce((sum: number, t: Transaction) => sum + t.amount, 0);

				setTotalExpense(expense);
				setTotalIncome(income);
				console.log("transactons", data)
			} catch (error) {
				console.log("Failed to fetch transactions", error);
			}
		};
		fetchTransactions();
	}, []);

	return (
		<div>
			<div className="absolute top-35 left-0 right-0 flex gap-5 px-7">
				<div className="flex-1 flex flex-col items-center justify-center h-20 rounded-xl border border-red-400 bg-red-100 text-red-700 shadow-sm dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
					<span className="text-sm font-medium">Expense</span>
					<span className="text-lg font-bold">₹{totalExpense.toLocaleString("en-IN")}</span>
				</div>

				<div className="flex-1 flex flex-col items-center justify-center h-20 rounded-xl border border-green-400 bg-green-100 text-green-700 shadow-sm dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
					<span className="text-sm font-medium">Income</span>
					<span className="text-lg font-bold">₹{totalIncome.toLocaleString("en-IN")}</span>
				</div>
			</div>
			<div className=" bg-black text-white p-4 mt-50 h-110 overflow-y-auto rounded-lg">
				<div className="space-y-4">
					{transactions.map((transaction, idx) => {
						const Icon = categoryIcons[transaction.category?.trim()];

						const isCredit = transaction.type;

						return (
							<div
								key={idx}
								className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow hover:border-zinc-700 transition"
							>
								{/* LEFT SIDE */}
								<div className="flex items-center gap-4">
									{/* Icon */}
									<div
										className={`p-3 rounded-full ${
											isCredit ? "bg-green-900/30" : "bg-red-900/30"
										}`}
									>
										{Icon && (
											<Icon
												className={`text-lg ${
													isCredit ? "text-green-400" : "text-red-400"
												}`}
											/>
										)}
									</div>

									{/* Text */}
									<div className="text-start">
										<h3 className="font-semibold text-lg">
											{transaction.title}
										</h3>
										<p className="text-sm text-gray-400">
											{transaction.category}
										</p>
									</div>
								</div>

								{/* RIGHT SIDE */}
								<div className="text-right">
									<p
										className={`text-lg font-semibold ${
											isCredit ? "text-green-400" : "text-red-400"
										}`}
									>
										{isCredit ? "+ " : "- "}₹{transaction.amount}
									</p>
									<p className="text-xs text-gray-500">
										{new Date(transaction.date).toLocaleDateString()}
									</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Empty State */}
				{transactions.length === 0 && (
					<p className="text-center text-gray-500 mt-10">
						No transactions found
					</p>
				)}
			</div>
		</div>
	);
};

export default Transactions;
