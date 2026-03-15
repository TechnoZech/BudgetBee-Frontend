"use client";

import { useAppSelector } from "../hooks/useAppSelector";

export default function Home() {
	const user = useAppSelector((state) => state.auth.user);

	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
				Please login to access Dashboard
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black text-center p-4">
			<h1 className="text-3xl sm:text-5xl font-bold mb-4 text-pink-600">
				Hi Babyy... 
      <span className="inline-block animate-spin text-5xl ">🌸</span>
			</h1>
			<p className="text-lg sm:text-2xl text-gray-700 dark:text-gray-300">
				This flower is for you! 🌷💛
			</p>
		</div>
	);
}
