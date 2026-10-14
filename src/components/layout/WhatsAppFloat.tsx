import Link from "next/link";
import { whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Floating WhatsApp button shown on every page.
 * Uses NEXT_PUBLIC_WHATSAPP_NUMBER. Until a number is configured it links to
 * the Contact page and says so, rather than opening a broken chat.
 */
export function WhatsAppFloat() {
  const href = whatsappLink();
  const cls =
    "group fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-[#17753f] p-3.5 text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)] transition-transform hover:-translate-y-0.5 hover:bg-[#125f33] sm:right-6 sm:bottom-6 sm:pr-5";

  if (!href) {
    return (
      <Link href="/contact" className={cls} aria-label="Contact us (WhatsApp number not configured yet)">
        <WhatsAppIcon className="size-7" />
        <span className="hidden text-sm font-semibold sm:inline">WhatsApp — number not set</span>
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Chat with us on WhatsApp (opens WhatsApp)">
      <WhatsAppIcon className="size-7" />
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
