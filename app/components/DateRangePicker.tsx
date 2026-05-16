"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export type DateRangePreset =
	| "today"
	| "yesterday"
	| "last7"
	| "last30"
	| "thisMonth"
	| "lastMonth"
	| "custom";

export type DateRangeValue = {
	start: Date;
	end: Date;
	preset: DateRangePreset;
};

const PRESET_LABELS: { id: DateRangePreset; label: string }[] = [
	{ id: "today", label: "Today" },
	{ id: "yesterday", label: "Yesterday" },
	{ id: "last7", label: "Last 7 days" },
	{ id: "last30", label: "Last 30 days" },
	{ id: "thisMonth", label: "This month" },
	{ id: "lastMonth", label: "Last month" },
	{ id: "custom", label: "Custom range" },
];

function startOfDay(d: Date) {
	const n = new Date(d);
	n.setHours(0, 0, 0, 0);
	return n;
}

function endOfDay(d: Date) {
	const n = new Date(d);
	n.setHours(23, 59, 59, 999);
	return n;
}

function getPresetRange(
	preset: Exclude<DateRangePreset, "custom">,
): { start: Date; end: Date } {
	const now = new Date();
	switch (preset) {
		case "today":
			return { start: startOfDay(now), end: endOfDay(now) };
		case "yesterday": {
			const y = new Date(now);
			y.setDate(y.getDate() - 1);
			return { start: startOfDay(y), end: endOfDay(y) };
		}
		case "last7": {
			const end = endOfDay(now);
			const start = startOfDay(now);
			start.setDate(start.getDate() - 6);
			return { start, end };
		}
		case "last30": {
			const end = endOfDay(now);
			const start = startOfDay(now);
			start.setDate(start.getDate() - 29);
			return { start, end };
		}
		case "thisMonth": {
			const start = new Date(now.getFullYear(), now.getMonth(), 1);
			const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
			return { start: startOfDay(start), end: endOfDay(end) };
		}
		case "lastMonth": {
			const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			const end = new Date(now.getFullYear(), now.getMonth(), 0);
			return { start: startOfDay(start), end: endOfDay(end) };
		}
	}
}

function sameDay(a: Date, b: Date) {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function dayInRange(day: Date, start: Date, end: Date) {
	const t = startOfDay(day).getTime();
	const s = startOfDay(start).getTime();
	const e = startOfDay(end).getTime();
	return t >= Math.min(s, e) && t <= Math.max(s, e);
}

function formatRangeBrief(start: Date, end: Date) {
	return `${start.toLocaleDateString("en-GB")} – ${end.toLocaleDateString("en-GB")}`;
}

const DateRangePicker = ({
	value,
	onChange,
}: {
	value?: DateRangeValue;
	onChange?: (range: DateRangeValue) => void;
}) => {
	const [open, setOpen] = useState(false);
	const [activePreset, setActivePreset] = useState<DateRangePreset>(
		value?.preset ?? "last7",
	);
	const [rangeStart, setRangeStart] = useState<Date>(() => {
		if (value) return startOfDay(value.start);
		return getPresetRange("last7").start;
	});
	const [rangeEnd, setRangeEnd] = useState<Date>(() => {
		if (value) return endOfDay(value.end);
		return getPresetRange("last7").end;
	});

	const [showCustomCalendar, setShowCustomCalendar] = useState(false);
	const [currentDate, setCurrentDate] = useState(() => new Date(rangeStart));
	const [customDraftStart, setCustomDraftStart] = useState<Date | null>(null);

	const ref = useRef<HTMLDivElement>(null);

	const applyRange = useCallback(
		(preset: DateRangePreset, start: Date, end: Date) => {
			const next: DateRangeValue = {
				preset,
				start,
				end,
			};
			setActivePreset(preset);
			setRangeStart(start);
			setRangeEnd(end);
			onChange?.(next);
		},
		[onChange],
	);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
				setShowCustomCalendar(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const handlePresetClick = (preset: DateRangePreset) => {
		if (preset === "custom") {
			setShowCustomCalendar(true);
			setActivePreset("custom");
			setCustomDraftStart(null);
			setCurrentDate(new Date(rangeStart));
			return;
		}
		setShowCustomCalendar(false);
		const { start, end } = getPresetRange(preset);
		applyRange(preset, start, end);
		setOpen(false);
	};

	const daysInMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0,
	).getDate();

	const firstDay = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1,
	).getDay();

	const handleCustomDayClick = (day: number) => {
		const selected = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			day,
		);

		if (!customDraftStart) {
			setCustomDraftStart(startOfDay(selected));
			return;
		}

		let start = startOfDay(customDraftStart);
		let end = endOfDay(selected);
		if (selected.getTime() < customDraftStart.getTime()) {
			start = startOfDay(selected);
			end = endOfDay(customDraftStart);
		}

		applyRange("custom", start, end);
		setShowCustomCalendar(false);
		setOpen(false);
		setCustomDraftStart(null);
	};

	const buttonLabel =
		activePreset === "custom"
			? formatRangeBrief(rangeStart, rangeEnd)
			: PRESET_LABELS.find((p) => p.id === activePreset)?.label ??
				formatRangeBrief(rangeStart, rangeEnd);

	return (
		<div className="relative w-full" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="w-full border border-zinc-700 bg-zinc-900 text-white rounded-lg px-4 py-3 text-left hover:border-zinc-500"
			>
				{buttonLabel}
			</button>

			{open && (
				<div className="absolute my-2 w-72 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4 z-50 text-white max-h-[min(90vh,32rem)] overflow-y-auto">
					<div className="space-y-1 mb-3">
						{PRESET_LABELS.map(({ id, label }) => (
							<button
								key={id}
								type="button"
								onClick={() => handlePresetClick(id)}
								className={`w-full text-left rounded-lg px-4 py-2 text-sm transition hover:bg-zinc-700 ${
									activePreset === id &&
									!(id === "custom" && showCustomCalendar)
										? "bg-zinc-800"
										: ""
								} ${
									id === "custom" && showCustomCalendar ? "bg-zinc-700/50" : ""
								}`}
							>
								{label}
							</button>
						))}
					</div>

					{showCustomCalendar && (
						<div className="border-t border-zinc-700 pt-3">
							<div className="flex justify-between items-center mb-3">
								<button
									type="button"
									onClick={() =>
										setCurrentDate(
											new Date(
												currentDate.getFullYear(),
												currentDate.getMonth() - 1,
											),
										)
									}
									className="hover:text-gray-400"
								>
									←
								</button>

								<span className="font-medium">
									{currentDate.toLocaleString("default", {
										month: "long",
										year: "numeric",
									})}
								</span>

								<button
									type="button"
									onClick={() =>
										setCurrentDate(
											new Date(
												currentDate.getFullYear(),
												currentDate.getMonth() + 1,
											),
										)
									}
									className="hover:text-gray-400"
								>
									→
								</button>
							</div>

							<div className="grid grid-cols-7 gap-1 text-center text-sm">
								{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
									<div key={d} className="text-gray-500">
										{d}
									</div>
								))}

								{Array.from({ length: firstDay }).map((_, i) => (
									<div key={`pad-${i}`} />
								))}

								{Array.from({ length: daysInMonth }).map((_, i) => {
									const day = i + 1;
									const cellDate = new Date(
										currentDate.getFullYear(),
										currentDate.getMonth(),
										day,
									);
									const inRange = customDraftStart
										? sameDay(cellDate, customDraftStart)
										: dayInRange(cellDate, rangeStart, rangeEnd);

									return (
										<button
											key={day}
											type="button"
											onClick={() => handleCustomDayClick(day)}
											className={`py-1 rounded transition hover:bg-zinc-700 ${
												inRange ? "bg-zinc-700 ring-1 ring-zinc-500" : ""
											}`}
										>
											{day}
										</button>
									);
								})}
							</div>
							<p className="text-xs text-gray-500 mt-2">
								Select start date, then end date.
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default DateRangePicker;
