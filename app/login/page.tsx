import Button from "../components/Button";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     Login page for BudgetBee
     <Button text="Go to Signup" url="/signup" className="mt-4" />
     <Button text="Go to Home" url="/home" className="mt-4" />
    </div>
  );
}
