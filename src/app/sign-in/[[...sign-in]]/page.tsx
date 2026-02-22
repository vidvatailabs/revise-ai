import { SignIn } from "@clerk/nextjs";
import { ForceDarkTheme } from "@/components/force-dark-theme";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <ForceDarkTheme />
      <div className="bg-glow" />
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-card border border-border shadow-xl",
          },
        }}
      />
    </div>
  );
}
