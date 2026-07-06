"use client";

import { useState } from "react";

type BlogShareButtonsProps = {
  url: string;
  title: string;
};

export function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${title} ${url}`
  )}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative flex flex-wrap items-center gap-4">
      <span className="text-base font-normal text-gray-300">
        Distribuie articolul
      </span>

      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Distribuie pe Facebook"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#1877F2] transition duration-500 hover:-translate-y-1 hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M14 8.5h2V5.3c-.4-.1-1.4-.2-2.7-.2-2.7 0-4.5 1.7-4.5 4.7v2.7H6v3.6h2.8V24h3.6v-7.9h2.8l.5-3.6h-3.3V10c0-1 .3-1.5 1.6-1.5Z"
          />
        </svg>
      </a>

      <span className="h-5 w-px bg-white/15" />

      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Distribuie pe WhatsApp"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#25D366] transition duration-500 hover:-translate-y-1 hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.5 3.5A11.3 11.3 0 0 0 12.3.1C6 .1.8 5.3.8 11.6c0 2 .5 3.9 1.5 5.7L.4 23l5.9-1.8c1.7.9 3.6 1.4 5.5 1.4h.1c6.3 0 11.5-5.2 11.5-11.5 0-3.1-1.2-6-3.4-8.1Zm-8.6 17.1h-.1c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.5 1 1-3.4-.2-.3a9.2 9.2 0 0 1-1.5-4.9c0-5.1 4.2-9.3 9.3-9.3 2.5 0 4.8 1 6.6 2.7a9.2 9.2 0 0 1 2.7 6.6c0 5.1-4.2 9.3-9.2 9.3Zm5.1-6.9c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.6.7c-.2.2-.4.2-.7.1-1.9-1-3.1-2.7-3.2-2.9-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.4-.4-.4-.7-.4h-.6c-.2 0-.5.1-.7.3-.7.7-1.1 1.6-1.1 2.6 0 .3.1 1.2.8 2.3.8 1.3 2 2.6 4.6 3.7.6.2 1 .4 1.4.5.6.2 1.1.1 1.5.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.2-.3-.2-.6-.4Z"
          />
        </svg>
      </a>

      <span className="h-5 w-px bg-white/15" />

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 text-base font-normal text-gray-300 transition duration-500 hover:-translate-y-1 hover:text-amber-300"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-amber-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path
            d="M10.5 13.5 13.5 10.5M8.2 15.8l-1.4 1.4a3 3 0 0 1-4.2-4.2L6 9.6a3 3 0 0 1 4.2 0M15.8 8.2l1.4-1.4a3 3 0 1 1 4.2 4.2L18 14.4a3 3 0 0 1-4.2 0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {copied ? "Link copiat" : "Copiază link"}
      </button>

      {copied ? (
        <div className="absolute -bottom-11 left-0 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm">
          Link copiat
        </div>
      ) : null}
    </div>
  );
}