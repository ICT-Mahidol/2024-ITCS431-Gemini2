import { LoginForm } from "../components/forms/login_form";
import { createFileRoute } from "@tanstack/react-router";
import { SpaceBackground } from "@/components/space_background";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row w-screen justify-center">
      <div className="flex w-full items-center justify-center p-6 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="font-bold text-[64px] bg-gradient-to-r from-teal-300 to-indigo-600 bg-clip-text text-transparent">
              Gemini-2
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3">
              Space Observatory
            </h1>
            <p className="text-muted-foreground">
              Welcome back! どちらの様ですか?
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden w-1/2 md:block bg-slate-600">
        <SpaceBackground />
      </div>
    </main>
  );
}
