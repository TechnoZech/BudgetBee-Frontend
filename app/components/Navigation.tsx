import Link from "next/link"

export default function Navigation() {
    const parentCSS = "bg-[#FFF799] w-200 text-black flex items-center justify-between px-8 py-4 rounded-md absolute left-[50%] translate-x-[-50%] top-4";
    const commonLinkCSS = "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full";
    return (
        <>
           <div className={parentCSS}>
                <Link className="font-bold text-xl" href="/">BUDGETBEE</Link>
                <div className="gap-5 flex font-medium text-xl">
                    <Link className={commonLinkCSS} href="/home">Home</Link>
                    <Link className={commonLinkCSS} href="/login">Login</Link>
                    <Link className={commonLinkCSS} href="/signup">Signup</Link>
                </div>
           </div>
        </>
    )
}