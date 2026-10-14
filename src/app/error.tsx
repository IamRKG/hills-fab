"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow text-accent-ink">Something went wrong</p>
      <h1 className="mt-4 text-4xl font-[780]">We couldn&apos;t load this page.</h1>
      <p className="mt-4 max-w-xl text-lg text-steel">Please try again. If the problem continues, contact us directly.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/contact" variant="outline">Contact us</ButtonLink>
      </div>
    </section>
  );
}
