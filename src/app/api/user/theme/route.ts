import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get user's theme preference
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { theme: true },
    });

    return NextResponse.json({ theme: user?.theme ?? "dark" });
  } catch (error) {
    console.error("Get theme error:", error);
    return NextResponse.json({ theme: "dark" });
  }
}

// Save user's theme preference
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { theme } = await request.json();

    if (!theme || !["light", "dark"].includes(theme)) {
      return NextResponse.json(
        { error: "Invalid theme. Must be 'light' or 'dark'." },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { theme },
    });

    return NextResponse.json({ success: true, theme });
  } catch (error) {
    console.error("Save theme error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
