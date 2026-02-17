import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/user";
import { OnboardingForm } from "@/components/onboarding-form";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: { change?: string };
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getOrCreateUser(userId);
  const isChangingClass = searchParams.change === "true";

  // Only redirect to dashboard if user already has a class AND is not changing it
  if (user.selectedClass && !isChangingClass) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="bg-glow" />
      <div className="relative z-10">
        <OnboardingForm
          currentClass={user.selectedClass}
          isChanging={isChangingClass}
        />
      </div>
    </div>
  );
}
