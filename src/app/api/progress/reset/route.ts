import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete all quiz attempts for this user
    const deleted = await prisma.quizAttempt.deleteMany({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      deleted: deleted.count,
    });
  } catch (error) {
    console.error("Reset progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
