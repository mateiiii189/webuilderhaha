"use client";

import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";

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
    } catch {
      setCopied(false);
    }
  }

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-base font-normal text-gray-300">
        Distribuie articolul
      </span>

      <div className="flex items-center gap-3">
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Distribuie pe Facebook"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#1877F2] transition duration-500 hover:-translate-y-1 hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10"
        >
          <FaFacebookF className="h-4 w-4" />
        </a>

        <span className="h-5 w-px bg-white/15" />

        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Distribuie pe WhatsApp"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#25D366] transition duration-500 hover:-translate-y-1 hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
        >
          <FaWhatsapp className="h-4 w-4" />
        </a>

        <span className="h-5 w-px bg-white/15" />

        <button
          type="button"
          onClick={handleCopy}
          className="group inline-flex h-10 items-center gap-2 text-base font-normal text-gray-300 transition duration-500 hover:-translate-y-1 hover:text-amber-300"
        >
          <Link2
            className="h-5 w-5 shrink-0 text-amber-300 transition duration-500 group-hover:scale-110"
            strokeWidth={2}
          />

          <span className="relative inline-block min-w-[96px] overflow-hidden">
            <span
              className={`block transition duration-300 ${
                copied
                  ? "-translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              Copiază link
            </span>

            <span
              className={`absolute left-0 top-0 block text-amber-300 transition duration-300 ${
                copied
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              Link copiat
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}