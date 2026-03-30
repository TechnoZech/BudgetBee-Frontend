"use client";

import { useState, useRef, useEffect } from "react";

const DropDown = ({
	options,
	handleDropdownChange,
	title,
}: {
	options: { _id: string; name: string }[];
	handleDropdownChange: (value: string) => void;
	title: string;
}) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleOptionClick = (value: string) => {
		handleDropdownChange(value);
		setOpen(false);
	};

	return (
		<div className="w-full">
			<div ref={dropdownRef} className="relative w-full">
				{/* Button */}
				<button
					onClick={() => setOpen((prev) => !prev)}
					className="w-full border border-zinc-700 bg-zinc-900 text-white rounded-lg px-4 py-3 text-left hover:border-zinc-500 inline-flex items-center justify-between"
				>
					<div className="flex items-center gap-2">
						<span>{title}</span>
					</div>

					<svg
						className="fill-current h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</button>

				{/* Dropdown */}
				{open && (
					<ul className="absolute mt-2 w-full border border-zinc-700 bg-zinc-900 text-white rounded-lg py-2 shadow z-50 max-h-50 overflow-y-auto">
						{options.map((option, idx) => {

							return (
								<li key={idx}>
									<button
										onClick={() => handleOptionClick(option._id)}
										className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-zinc-700 rounded"
									>
										<span>{option.name}</span>
									</button>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default DropDown;
