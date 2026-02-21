import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Save the user's last viewed topic position in a chapter
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chapterId, lastViewedTopicOrder } = await request.json();

    if (!chapterId || typeof lastViewedTopicOrder !== "number") {
      return NextResponse.json(
        { error: "chapterId and lastViewedTopicOrder (number) required." },
        { status: 400 }
      );
    }

    // Always save the current position — user may go forward or backward
    const progress = await prisma.chapterProgress.upsert({
      where: { userId_chapterId: { userId, chapterId } },
      update: { lastViewedTopicOrder },
      create: { userId, chapterId, lastViewedTopicOrder },
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error("Chapter progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
