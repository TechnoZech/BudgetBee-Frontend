import Link from "next/link";

type ButtonProps = {
	className?: string;
	onClick?: () => void;
	url?: string;
	text: string;
};

export default function Button({ className, onClick, text, url }: ButtonProps) {

    const commonCSS = "px-8 py-3 rounded-md border border-violet-200 bg-violet-500 hover:bg-violet-600 cursor-pointer text-2xl";
	return (
		<>
			{url ? (
				<Link className={`${commonCSS} ${className}`} href={url}>
					{text}
				</Link>
			) : (
				<button
					className={`${commonCSS} ${className}`}
					onClick={onClick}
				>
					{text}
				</button>
			)}
		</>
	);
}
