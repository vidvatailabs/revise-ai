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
    const deletedAttempts = await prisma.quizAttempt.deleteMany({
      where: { userId },
    });

    // Also delete all topic statuses (got_it / revise_later)
    const deletedStatuses = await prisma.topicStatus.deleteMany({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      deletedAttempts: deletedAttempts.count,
      deletedStatuses: deletedStatuses.count,
    });
  } catch (error) {
    console.error("Reset progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
