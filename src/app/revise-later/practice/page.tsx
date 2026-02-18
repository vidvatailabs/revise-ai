import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getOrCreateUser } from "@/lib/user";
import { AppHeader } from "@/components/app-header";
import { ReviseAllCards } from "@/components/revise-all-cards";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookmarkPlus } from "lucide-react";
import Link from "next/link";

export default async function ReviseAllPracticePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getOrCreateUser(userId);
  if (!user.selectedClass) redirect("/onboarding");

  // Fetch all revise_later topics for the current class
  const reviseLaterTopics = await prisma.topicStatus.findMany({
    where: {
      userId,
      status: "revise_later",
      topic: {
        chapter: {
          subject: {
            class: user.selectedClass,
          },
        },
      },
    },
    include: {
      topic: {
        include: {
          chapter: {
            include: {
              subject: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // If nothing to revise, redirect back
  if (reviseLaterTopics.length === 0) {
    redirect("/revise-later");
  }

  const topics = reviseLaterTopics.map((ts) => ({
    id: ts.topic.id,
    title: ts.topic.title,
    summary: ts.topic.summary,
    order: ts.topic.order,
    status: ts.status as string | null,
    chapterTitle: ts.topic.chapter.title,
    subjectTitle: ts.topic.chapter.subject.title,
    subjectIcon: ts.topic.chapter.subject.icon,
  }));

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="relative z-0 max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          href="/revise-later"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Revise Later
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
              <BookmarkPlus className="h-3 w-3 mr-1" />
              Revision Mode
            </Badge>
            <Badge variant="outline" className="text-xs">
              Class {user.selectedClass}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Revise All Topics
          </h1>
          <p className="text-muted-foreground">
            {topics.length} topics across all chapters
          </p>
        </div>

        {/* Cards */}
        <div className="mb-10">
          <ReviseAllCards topics={topics} />
        </div>
      </main>
    </div>
  );
}
