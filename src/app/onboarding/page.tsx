import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/user";
import { OnboardingForm } from "@/components/onboarding-form";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getOrCreateUser(userId);
  if (user.selectedClass) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="bg-glow" />
      <div className="relative z-10">
        <OnboardingForm />
      </div>
    </div>
  );
}
