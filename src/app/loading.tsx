export default function Loading() {
  return (
    <div className="container-x py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="h-3 w-32 animate-pulse rounded bg-line" />
      <div className="mt-6 h-10 w-3/4 max-w-xl animate-pulse rounded bg-line" />
      <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-mist" />
      <div className="mt-2 h-5 w-2/3 max-w-xl animate-pulse rounded bg-mist" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="aspect-[4/3] animate-pulse rounded-[6px] bg-mist" />)}
      </div>
    </div>
  );
}
