"use client";

import {
	PieChart as RePieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";

interface PieChartData {
	name: string; // e.g., "Income" / "Expense"
	value: number;
}

interface PieChartProps {
	data: PieChartData[];
	colors?: string[];
}

const PieChart = ({
	data,
	colors = ["#facc15", "#f87171", "#60a5fa", "#34d399"],
}: PieChartProps) => {
	if (!data || data.length === 0)
		return <p className="text-center mt-4">No data to display</p>;

	return (
		<div className="w-full h-64">
			<ResponsiveContainer>
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
								fill={colors[index % colors.length]}
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
};

export default PieChart;
