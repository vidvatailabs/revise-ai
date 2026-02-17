export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="h-8 w-28 rounded-lg bg-muted animate-pulse" />
          <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-2" />
          <div className="h-5 w-32 bg-muted rounded-lg animate-pulse" />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="h-4 w-16 bg-muted rounded animate-pulse mb-2" />
              <div className="h-8 w-10 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Subjects skeleton */}
        <div className="h-7 w-36 bg-muted rounded-lg animate-pulse mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
                <div>
                  <div className="h-5 w-32 bg-muted rounded animate-pulse mb-1" />
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="h-2 w-full bg-muted rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
