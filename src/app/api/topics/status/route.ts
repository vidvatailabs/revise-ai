import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topicId, status } = await request.json();

    if (!topicId || !["got_it", "revise_later"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid request. topicId and status (got_it|revise_later) required." },
        { status: 400 }
      );
    }

    // Upsert - create or update the status
    const topicStatus = await prisma.topicStatus.upsert({
      where: {
        userId_topicId: { userId, topicId },
      },
      update: { status },
      create: { userId, topicId, status },
    });

    return NextResponse.json({ success: true, topicStatus });
  } catch (error) {
    console.error("Topic status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Remove a topic status (unmark)
export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topicId } = await request.json();

    if (!topicId) {
      return NextResponse.json(
        { error: "topicId required" },
        { status: 400 }
      );
    }

    await prisma.topicStatus.deleteMany({
      where: { userId, topicId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Topic status delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
