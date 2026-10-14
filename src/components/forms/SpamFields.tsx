"use client";

import { useEffect, useRef } from "react";

/** Honeypot + time-trap fields. Invisible to people, tempting to bots. */
export function SpamFields() {
  const startedRef = useRef<HTMLInputElement>(null);
  // Record when the form was first shown (set on the client, never at build time).
  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  }, []);
  return (
    <>
      <input ref={startedRef} type="hidden" name="startedAt" />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
    </>
  );
}
