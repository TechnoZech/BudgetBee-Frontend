import Button from "./components/Button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to BudgetBee</h1>
      <Button text="Login" url="/login"/>
    </div>
    </div>
  );
}
