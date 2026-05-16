"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "../hooks/useAppSelector";

export default function Navbar() {
	const user = useAppSelector((state) => state.auth.user);

	const parentCSS =
		"bg-[#FFF799] w-[40%] text-black flex items-center justify-center px-4 sm:px-8 py-2 rounded-b-full absolute left-1/2 -translate-x-1/2 shadow-md";
	return (
		<div className={parentCSS}>
			<div className="flex items-center gap-2 sm:mb-0">
				<Image width={20} height={20} src="/logo.png" alt="Logo" />
				<Link className="font-bold text-[10px]" href="/">
					BUDGETBEE
				</Link>
			</div>
		</div>
	);
}
