"use client";

import { useAppSelector } from "../hooks/useAppSelector";
import LineChart from "../components/LineChart";
import {
	PieChart as RePieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";

interface Transaction {
	id: string;
	amount: number;
	type: boolean; // true = income, false = expense
	date: string;
	category: string; // e.g., "Food", "Salary", etc.
}

const Stats = () => {
	const transactions: Transaction[] = useAppSelector(
		(state) => state.transaction.transactions,
	);

	// 1️⃣ Total Income vs Expense
	const totalData = [
		{
			name: "Income",
			value: transactions
				.filter((t) => t.type === true)
				.reduce((sum, t) => sum + t.amount, 0),
		},
		{
			name: "Expense",
			value: transactions
				.filter((t) => t.type === false)
				.reduce((sum, t) => sum + t.amount, 0),
		},
	];

	// 2️⃣ Expense by category
	const expenseData = Object.values(
		transactions
			.filter((t) => t.type === false)
			.reduce((acc: Record<string, { name: string; value: number }>, t) => {
				if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 };
				acc[t.category].value += t.amount;
				return acc;
			}, {}),
	);

	// 3️⃣ Income by category
	const incomeData = Object.values(
		transactions
			.filter((t) => t.type === true)
			.reduce((acc: Record<string, { name: string; value: number }>, t) => {
				if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 };
				acc[t.category].value += t.amount;
				return acc;
			}, {}),
	);

	const COLORS = [
		"#facc15",
		"#f87171",
		"#60a5fa",
		"#34d399",
		"#a78bfa",
		"#f472b6",
		"#fbbf24",
		"#22d3ee",
	];

	const renderPieChart = (
		data: { name: string; value: number }[],
		title: string,
	) => (
		<div className="w-full md:w-1/2 lg:w-1/3 p-2">
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<ResponsiveContainer width="100%" height={250}>
				<RePieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={80}
						label={(entry) => entry.name}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip
						formatter={(value: number, name: string) => [`${value}`, name]}
						contentStyle={{
							backgroundColor: "#1f2937",
							border: "none",
							borderRadius: "8px",
							color: "#facc15",
						}}
					/>
					<Legend verticalAlign="bottom" />
				</RePieChart>
			</ResponsiveContainer>
		</div>
	);

	return (
		<div className="mt-30 flex min-h-screen flex-col justify-center bg-zinc-50 dark:bg-black text-center p-4 gap-8">
			<LineChart data={transactions} />
			<div className="flex flex-wrap justify-center gap-4">
				{renderPieChart(expenseData, "Expenses by Category")}
				{renderPieChart(incomeData, "Income by Category")}
				{renderPieChart(totalData, "Total Income vs Expense")}
			</div>
		</div>
	);
};

export default Stats;
