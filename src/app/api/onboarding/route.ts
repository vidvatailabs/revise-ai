import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { selectedClass } = await request.json();

    if (![8, 9, 10].includes(selectedClass)) {
      return NextResponse.json(
        { error: "Invalid class selection" },
        { status: 400 }
      );
    }

    // Ensure user exists
    await getOrCreateUser(userId);

    // Update selected class
    const user = await prisma.user.update({
      where: { id: userId },
      data: { selectedClass },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
