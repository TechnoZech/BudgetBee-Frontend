"use client";

import {
	LineChart as ReLineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

const LineChart = ({ data }: { data: any[] }) => {
	if (!data || data.length === 0)
		return <p className="text-center mt-4">No data to display</p>;

	const processedData = [...data]
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.map((t) => ({
			rawDate: t.date, // keep original date
			date: new Date(t.date).toLocaleDateString("en-IN", {
				day: "2-digit",
				month: "short",
			}),
			amount: t.amount,
			type: t.type,
		}));

	return (
		<div className="w-full h-64">
			<ResponsiveContainer>
				<ReLineChart data={processedData}>
					<CartesianGrid strokeDasharray="3 3" stroke="#444" />
					<XAxis dataKey="date" stroke="#aaa" />
					<YAxis stroke="#aaa" />
					<Tooltip
						contentStyle={{
							backgroundColor: "#1f2937",
							border: "none",
							borderRadius: "8px",
						}}
						itemStyle={{ color: "#facc15" }}
					/>
					<Line
						type="monotone"
						dataKey="amount"
						stroke="#facc15"
						strokeWidth={3}
						dot={{ r: 4 }}
						activeDot={{ r: 6 }}
						isAnimationActive={true}
						animationDuration={1500}
						data={processedData.filter(d => d.type === false)}
					/>
				</ReLineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default LineChart;
