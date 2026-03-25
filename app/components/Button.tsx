import Link from "next/link";

type ButtonProps = {
	className?: string;
	onClick?: () => void;
	url?: string;
	text?: string;
};

export default function Button({ className, onClick, text, url }: ButtonProps) {
	const commonCSS =
		"px-4 py-3 rounded-md border border-yellow-400 bg-yellow-300 hover:bg-yellow-400 text-black font-bold transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white";
	return (
		<>
			{url ? (
				<Link className={`${commonCSS} ${className}`} href={url}>
					{text}
				</Link>
			) : (
				<button className={`${commonCSS} ${className}`} onClick={onClick}>
					{text}
				</button>
			)}
		</>
	);
}
