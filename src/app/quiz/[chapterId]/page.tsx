import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AppHeader } from "@/components/app-header";
import { QuizClient } from "@/components/quiz-client";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default async function QuizPage({
  params,
}: {
  params: { chapterId: string };
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const chapter = await prisma.chapter.findUnique({
    where: { id: params.chapterId },
    include: {
      subject: true,
      mcqs: true,
    },
  });

  if (!chapter) notFound();
  if (chapter.mcqs.length === 0) redirect(`/chapters/${chapter.id}`);

  // Shuffle and take up to 10 questions
  const shuffled = [...chapter.mcqs].sort(() => Math.random() - 0.5);
  const quizMcqs = shuffled.slice(0, 10).map((mcq) => ({
    id: mcq.id,
    question: mcq.question,
    optionA: mcq.optionA,
    optionB: mcq.optionB,
    optionC: mcq.optionC,
    optionD: mcq.optionD,
  }));

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          href={`/chapters/${chapter.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Chapter
        </Link>

        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {chapter.subject.title}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Quiz
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {chapter.title}
          </h1>
          <p className="text-muted-foreground">
            Answer all {quizMcqs.length} questions and submit to see your score
          </p>
        </div>

        {/* Quiz Component */}
        <QuizClient
          mcqs={quizMcqs}
          chapterId={chapter.id}
          chapterTitle={chapter.title}
          subjectId={chapter.subjectId}
        />
      </main>
    </div>
  );
}
