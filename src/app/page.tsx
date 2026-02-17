import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  BookOpen,
  Target,
  Brain,
  Zap,
  FileText,
  BarChart3,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Target,
    title: "Topic-Wise Revision",
    description:
      "Pick a subject and get structured, topic-by-topic revision plans tailored to your exam syllabus.",
  },
  {
    icon: Brain,
    title: "Adaptive Learning",
    description:
      "AI identifies your weak spots and adjusts the revision flow so you spend time where it counts most.",
  },
  {
    icon: Zap,
    title: "Quick Recaps & Summaries",
    description:
      "Get concise, exam-focused summaries for any topic — perfect for last-minute revision.",
  },
  {
    icon: FileText,
    title: "Practice Questions",
    description:
      "AI-generated MCQs modelled on real exam patterns help you test understanding and build confidence.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Visual dashboards show what you've covered, what needs attention, and how ready you are.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your study data stays yours. Enterprise-grade encryption keeps your information safe.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow */}
      <div className="bg-glow" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 backdrop-blur-xl bg-background/70 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-purple-600">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          Revise AI
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="#features"
            className="hidden sm:inline text-sm font-medium text-muted-foreground hover:text-white transition-colors"
          >
            Features
          </Link>
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0">
                Get Started
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0">
                Dashboard <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-[1] flex flex-col items-center justify-center text-center min-h-screen px-4 pt-32 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-8 animate-fade-down">
          <Sparkles className="h-4 w-4" />
          Now Live — Class 10 CBSE
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] max-w-4xl animate-fade-down [animation-delay:100ms]">
          Ace Your Exams with{" "}
          <span className="gradient-text">AI-Powered Revision</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl animate-fade-down [animation-delay:200ms]">
          Revise AI turns your syllabus into smart, personalised revision
          sessions. Focus on what matters, retain more, and walk into every exam
          confident.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-down [animation-delay:300ms]">
          <SignedOut>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg shadow-indigo-500/25 text-base px-8 h-12"
              >
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg shadow-indigo-500/25 text-base px-8 h-12"
              >
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </SignedIn>
          <Link href="#features">
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 h-12 border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
            >
              See How It Works
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-[1] max-w-6xl mx-auto px-4 pb-24"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2">
          Why Students Love Revise AI
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Built for real exam prep — not just flashcards
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4">
                <feature.icon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-[1] border-t border-white/[0.06] py-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Revise AI — A product of{" "}
          <a
            href="https://www.vidvatailabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            VidvatAI Labs
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}
