export default function QuizLoading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="h-8 w-28 rounded-lg bg-muted animate-pulse" />
          <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="h-4 w-36 bg-muted rounded animate-pulse mb-6" />

        <div className="mb-8">
          <div className="flex gap-2 mb-2">
            <div className="h-5 w-24 bg-muted rounded-full animate-pulse" />
            <div className="h-5 w-12 bg-muted rounded-full animate-pulse" />
          </div>
          <div className="h-8 w-56 bg-muted rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="h-5 w-3/4 bg-muted rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 rounded-lg border border-border px-4 py-3"
                  >
                    <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
                    <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
