"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { logout } from "../store/slices/authSlice";

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth!); 
      dispatch(logout());   
      router.push("/");     
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const parentCSS =
    "bg-[#FFF799] w-[90%] sm:w-[700px] text-black flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 rounded-md absolute left-1/2 -translate-x-1/2 top-4 shadow-md";

  const commonLinkCSS =
    "relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className={parentCSS}>
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <Image width={40} height={40} src="/logo.png" alt="Logo" />
        <Link className="font-bold text-xl" href="/">
          BUDGETBEE
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-5 gap-2 font-medium text-xl items-center">
        {user ? (
          <>
            <Link className={commonLinkCSS} href="/home">
              Home
            </Link>

            <button className={commonLinkCSS} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link className={commonLinkCSS} href="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}