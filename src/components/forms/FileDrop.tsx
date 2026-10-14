"use client";

import { useRef, useState } from "react";
import { FileText, ImageIcon, Paperclip, X } from "lucide-react";
import { ENQUIRY_LIMITS, formatBytes, validateFiles } from "@/lib/enquiry";
import { cn } from "@/lib/utils";

type Props = { label: string; hint?: string; error?: string; onErrorChange?: (msg?: string) => void };

/** Accessible multi-file picker. Keeps the native <input type="file"> as the source of truth so FormData includes the files. */
export function FileDrop({ label, hint, error, onErrorChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const sync = (next: File[]) => {
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    if (inputRef.current) inputRef.current.files = dt.files;
    setFiles(next);
    onErrorChange?.(validateFiles(next));
  };

  const add = (list: File[]) => {
    const merged = [...files];
    for (const f of list) {
      if (!merged.some((m) => m.name === f.name && m.size === f.size)) merged.push(f);
    }
    sync(merged.slice(0, ENQUIRY_LIMITS.maxFiles + 1));
  };

  return (
    <div>
      <span className="field-label" id="attachments-label">
        {label} <span className="font-normal text-steel">(optional)</span>
      </span>
      <label
        htmlFor="f-attachments"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); add(Array.from(e.dataTransfer.files)); }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[4px] border-2 border-dashed px-4 py-8 text-center transition-colors",
          dragging ? "border-accent bg-accent/5" : "border-[#c3ccd3] bg-mist hover:border-steel",
          error && "border-danger",
        )}
      >
        <Paperclip className="size-6 text-steel" aria-hidden="true" />
        <span className="font-semibold text-charcoal">Tap to choose files <span className="hidden font-normal text-steel sm:inline">or drag them here</span></span>
        <span className="text-sm text-steel">{hint ?? `JPG, PNG, WebP, HEIC or PDF · up to ${ENQUIRY_LIMITS.maxFiles} files, 8 MB each`}</span>
      </label>
      <input
        ref={inputRef}
        id="f-attachments"
        name="attachments"
        type="file"
        multiple
        accept={ENQUIRY_LIMITS.accept}
        className="sr-only"
        aria-labelledby="attachments-label"
        aria-describedby={error ? "f-attachments-error" : undefined}
        onChange={(e) => {
          // The native picker replaces the list, so merge new picks with earlier ones.
          add(Array.from(e.target.files ?? []));
        }}
      />
      {files.length > 0 && (
        <ul className="mt-3 divide-y divide-line rounded-[4px] border border-line">
          {files.map((f, i) => (
            <li key={`${f.name}-${f.size}`} className="flex items-center gap-3 px-3 py-2 text-sm">
              {f.type === "application/pdf" ? <FileText className="size-4 text-steel" aria-hidden="true" /> : <ImageIcon className="size-4 text-steel" aria-hidden="true" />}
              <span className="min-w-0 flex-1 truncate">{f.name}</span>
              <span className="text-steel">{formatBytes(f.size)}</span>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded hover:bg-mist"
                aria-label={`Remove ${f.name}`}
                onClick={() => sync(files.filter((_, j) => j !== i))}
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p id="f-attachments-error" className="field-error" role="alert">{error}</p>}
    </div>
  );
}
