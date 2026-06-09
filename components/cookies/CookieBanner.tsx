"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Script from "next/script";
import Link from "next/link";

type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "webuilder_cookie_consent";

const bannerVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 34,
    scale: 0.985,
  },
};

const viewVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -12,
  },
};

const cookieButtonVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function updateGoogleConsent(consent: CookieConsent) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }

  gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
}

export function CookieBanner() {
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCookieButton, setShowCookieButton] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const [shouldLoadGtm, setShouldLoadGtm] = useState(false);

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);

    if (!savedConsent) {
      setIsOpen(true);
      setShowCookieButton(false);
      setHasCheckedConsent(true);
      return;
    }

    try {
      const parsedConsent = JSON.parse(savedConsent) as CookieConsent;

      setConsent(parsedConsent);
      updateGoogleConsent(parsedConsent);

      if (parsedConsent.analytics || parsedConsent.marketing) {
        setShouldLoadGtm(true);
      }

      setIsOpen(false);
      setShowCookieButton(true);
      setHasCheckedConsent(true);
    } catch {
      setIsOpen(true);
      setShowCookieButton(false);
      setHasCheckedConsent(true);
    }
  }, []);

  function openBanner() {
    setShowCookieButton(false);
    setShowSettings(false);
    setIsOpen(true);
  }

  function closeBannerAfterConsent(nextConsent: CookieConsent) {
    setConsent(nextConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(nextConsent));
    updateGoogleConsent(nextConsent);

    if (nextConsent.analytics || nextConsent.marketing) {
      setShouldLoadGtm(true);
    }

    setIsOpen(false);
  }

  function acceptAll() {
    closeBannerAfterConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  }

  function rejectOptional() {
    closeBannerAfterConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  }

  function saveCustom() {
    closeBannerAfterConsent(consent);
  }

  if (!hasCheckedConsent) {
    return null;
  }

  return (
    <>
      {shouldLoadGtm && gtmId ? (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ) : null}

      <AnimatePresence>
        {showCookieButton && !isOpen ? (
          <motion.button
            key="cookie-button"
            type="button"
            variants={cookieButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
            }}
            onClick={openBanner}
            className="fixed bottom-5 left-5 z-[60] rounded-full border border-white/10 bg-[#0B0F14] px-4 py-2 text-xs font-semibold text-white shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:text-amber-300"
          >
            Cookies
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (!isOpen) {
            setShowSettings(false);
            setShowCookieButton(true);
          }
        }}
      >
        {isOpen ? (
          <motion.div
            key="cookie-banner"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-x-0 bottom-5 z-[70] px-4"
          >
            <motion.div
              layout
              animate={{
                maxWidth: showSettings ? 1080 : 1024,
              }}
              transition={{
                maxWidth: {
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                },
                layout: {
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              style={{
                width: "100%",
              }}
              className="mx-auto grid gap-6 overflow-visible rounded-3xl border border-white/10 bg-[#0B0F14] p-6 shadow-2xl shadow-black/50 backdrop-blur-xl transition duration-500 hover:border-amber-400/30 lg:grid-cols-[1fr_0.75fr] lg:items-center"
            >
              <motion.div layout>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                  Cookies & GDPR
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Folosim cookies pentru funcționare, analiză și marketing.
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  Cookie-urile necesare sunt active permanent. Cookie-urile de
                  analiză și marketing sunt folosite doar cu acordul tău. Poți
                  modifica opțiunile oricând din butonul „Cookies”.
                </p>

                <p className="mt-3 text-xs leading-6 text-gray-500">
                  Detalii în{" "}
                  <Link
                    href="/politica-cookies"
                    className="text-amber-300 transition hover:text-amber-200"
                  >
                    Politica cookies
                  </Link>{" "}
                  și{" "}
                  <Link
                    href="/politica-de-confidentialitate"
                    className="text-amber-300 transition hover:text-amber-200"
                  >
                    Politica de confidențialitate și GDPR
                  </Link>
                  .
                </p>
              </motion.div>

                <motion.div
                animate={{
                    height: showSettings ? 380 : 152,
                }}
                transition={{
                    height: {
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                    },
                }}
                className="overflow-visible"
                >
                <AnimatePresence mode="wait" initial={false}>
                  {showSettings ? (
                    <motion.div
                      key="cookie-settings"
                      variants={viewVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                    }}
                      className="space-y-4"
                    >
                      <label className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/[0.05]">
                        <span>
                          <span className="block text-sm font-semibold text-white">
                            Necesare
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-gray-400">
                            Necesare pentru funcționarea site-ului. Nu pot fi
                            dezactivate.
                          </span>
                        </span>

                        <input
                          type="checkbox"
                          checked
                          disabled
                          className="mt-1"
                        />
                      </label>

                      <label className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/[0.05]">
                        <span>
                          <span className="block text-sm font-semibold text-white">
                            Analiză
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-gray-400">
                            Pentru Google Analytics 4 și măsurarea traficului.
                          </span>
                        </span>

                        <input
                          type="checkbox"
                          checked={consent.analytics}
                          className="mt-1"
                          onChange={(event) =>
                            setConsent((current) => ({
                              ...current,
                              analytics: event.target.checked,
                            }))
                          }
                        />
                      </label>

                      <label className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/[0.05]">
                        <span>
                          <span className="block text-sm font-semibold text-white">
                            Marketing
                          </span>
                          <span className="mt-1 block text-xs leading-5 text-gray-400">
                            Pentru Google Ads, conversii și remarketing.
                          </span>
                        </span>

                        <input
                          type="checkbox"
                          checked={consent.marketing}
                          className="mt-1"
                          onChange={(event) =>
                            setConsent((current) => ({
                              ...current,
                              marketing: event.target.checked,
                            }))
                          }
                        />
                      </label>

                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <button
                          type="button"
                          onClick={saveCustom}
                          className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                        >
                          Salvează preferințele
                        </button>

                        <button
                          type="button"
                          onClick={rejectOptional}
                          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/10"
                        >
                          Doar necesare
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowSettings(false)}
                          className="rounded-full px-6 py-3 text-sm font-semibold text-gray-400 transition duration-300 hover:-translate-y-0.5 hover:text-white"
                        >
                          Înapoi
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                    key="cookie-main"
                    variants={viewVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex flex-col gap-3"
                    >
                      <button
                        type="button"
                        onClick={acceptAll}
                        className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                      >
                        Accept toate
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowSettings(true)}
                        className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/10"
                      >
                        Setări cookies
                      </button>

                      <button
                        type="button"
                        onClick={rejectOptional}
                        className="rounded-full px-6 py-3 text-sm font-semibold text-gray-400 transition duration-300 hover:-translate-y-0.5 hover:text-white"
                      >
                        Refuz cookie-urile opționale
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}