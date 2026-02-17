import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chapterId, answers } = await request.json();

    if (!chapterId || !answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Fetch the MCQs that were answered
    const mcqIds = Object.keys(answers);
    const mcqs = await prisma.mCQ.findMany({
      where: { id: { in: mcqIds } },
    });

    if (mcqs.length === 0) {
      return NextResponse.json(
        { error: "No valid questions found" },
        { status: 400 }
      );
    }

    // Calculate score
    let score = 0;
    const results = mcqs.map((mcq) => {
      const selected = answers[mcq.id] || "";
      const isCorrect = selected === mcq.correctAnswer;
      if (isCorrect) score++;
      return {
        mcqId: mcq.id,
        question: mcq.question,
        selected,
        correct: mcq.correctAnswer,
        isCorrect,
        explanation: mcq.explanation,
        optionA: mcq.optionA,
        optionB: mcq.optionB,
        optionC: mcq.optionC,
        optionD: mcq.optionD,
      };
    });

    // Save quiz attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        userId,
        chapterId,
        score,
        total: mcqs.length,
      },
    });

    return NextResponse.json({
      score,
      total: mcqs.length,
      results,
      attemptId: attempt.id,
    });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
