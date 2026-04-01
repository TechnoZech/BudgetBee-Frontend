"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiList, FiPieChart, FiUser } from "react-icons/fi";

type NavItem = {
	label: string;
	href: string;
	icon: React.ElementType;
};

const navItems: NavItem[] = [
	{ label: "Home", href: "/home", icon: FiHome },
	{ label: "Transactions", href: "/transactions", icon: FiList },
	{ label: "Stats", href: "/stats", icon: FiPieChart },
	{ label: "Profile", href: "/profile", icon: FiUser },
];

const BottomNavigation = () => {
	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur supports-backdrop-filter:bg-white/60">
			<div className="flex justify-around items-center h-16 pb-safe">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					const Icon = item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							onClick={() => {
								if (navigator.vibrate) {
									navigator.vibrate(10);
								}
							}}
							className="flex flex-col items-center justify-center flex-1 py-2"
						>
							<Icon
								className={`text-xl ${
									isActive
										? "text-yellow-500"
										: "text-zinc-500 dark:text-zinc-400"
								}`}
							/>
							<span
								className={`text-xs mt-1 ${
									isActive
										? "text-yellow-500 font-medium"
										: "text-zinc-500 dark:text-zinc-400"
								}`}
							>
								{item.label}
							</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default BottomNavigation;
