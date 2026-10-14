"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: 48, color: "#222831" }}>
        <h1>Something went wrong</h1>
        <p>Please refresh the page or try again shortly.</p>
        <button type="button" onClick={reset} style={{ padding: "12px 20px", background: "#F28C28", border: 0, borderRadius: 4, fontWeight: 600 }}>
          Try again
        </button>
      </body>
    </html>
  );
}
