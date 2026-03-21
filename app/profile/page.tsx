"use client";

import Image from "next/image";
import { useAppSelector } from "../hooks/useAppSelector";
import Button from "../components/Button";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAppDispatch } from "../hooks/useAppSelector";
import { logout } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";

const Profile = () => {
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
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black text-center p-4 gap-3">
			<Image
            className="rounded-full border-2 border-yellow-300 shadow-lg"
				height={100}
				width={100}
				src={user?.photo || "/default-avatar.png"}
				alt={user?.name || "User"}
			/>
			<h1 className="font-bold text-xl">{user?.name}</h1>
			<h1>{user?.email}</h1>
            <Button onClick={handleLogout} text="Logout" className="mt-4" />
		</div>
	);
};

export default Profile;
