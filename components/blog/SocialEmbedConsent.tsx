"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "webuilder_cookie_consent";

type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type SocialEmbedConsentProps = {
  platform: "Instagram" | "Facebook";
  children: React.ReactNode;
};

export function SocialEmbedConsent({
  platform,
  children,
}: SocialEmbedConsentProps) {
  const [hasMarketingConsent, setHasMarketingConsent] = useState(false);
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);

  useEffect(() => {
    function checkConsent() {
      const storedConsent = localStorage.getItem(CONSENT_KEY);

      if (!storedConsent) {
        setHasMarketingConsent(false);
        setHasCheckedConsent(true);
        return;
      }

      try {
        const parsedConsent = JSON.parse(storedConsent) as CookieConsent;
        setHasMarketingConsent(Boolean(parsedConsent.marketing));
      } catch {
        setHasMarketingConsent(false);
      }

      setHasCheckedConsent(true);
    }

    checkConsent();

    window.addEventListener("storage", checkConsent);
    window.addEventListener("webuilder-cookie-consent-updated", checkConsent);

    return () => {
      window.removeEventListener("storage", checkConsent);
      window.removeEventListener(
        "webuilder-cookie-consent-updated",
        checkConsent
      );
    };
  }, []);

  if (!hasCheckedConsent) {
    return null;
  }

  if (!hasMarketingConsent) {
    return (
      <div className="my-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/20">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-300">
          {platform} embed blocat
        </p>

        <h3 className="mt-4 text-2xl font-black text-white">
          Acceptă cookies de marketing pentru a vedea postarea.
        </h3>

        <p className="mt-4 text-sm leading-7 text-gray-400">
          Postările integrate de pe {platform} pot încărca scripturi și cookies
          de la Meta. Pentru a le afișa, activează cookies de marketing din
          butonul „Cookies”.
        </p>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new Event("webuilder-open-cookie-settings"));
          }}
          className="mt-6 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition duration-500 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/10 hover:text-amber-300"
        >
          Deschide setările cookies
        </button>
      </div>
    );
  }

  return <>{children}</>;
}