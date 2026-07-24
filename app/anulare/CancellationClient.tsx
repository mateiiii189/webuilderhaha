"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

type MeetingDetails = {
  eventId: string;
  title: string;
  date: string;
  time: string;
  rescheduleUrl?: string;
};

type ViewState =
  | "loading"
  | "ready"
  | "cancelling"
  | "cancelled"
  | "invalid"
  | "error";

type ApiResponse = {
  success: boolean;
  code?: string;
  error?: string;
  eventId?: string;
  title?: string;
  date?: string;
  time?: string;
  rescheduleUrl?: string;
};

export default function CancellationClient() {
  const searchParams = useSearchParams();

  const eventId = searchParams.get("id") ?? "";
  const signature = searchParams.get("signature") ?? "";

  const [state, setState] = useState<ViewState>("loading");
  const [meeting, setMeeting] =
    useState<MeetingDetails | null>(null);
  const [error, setError] = useState("");

  const payload = useMemo(
    () => ({
      eventId,
      signature,
    }),
    [eventId, signature],
  );

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousRestoration =
      window.history.scrollRestoration;

    const previousHtmlBehavior =
      html.style.scrollBehavior;

    const previousBodyBehavior =
      body.style.scrollBehavior;

    window.history.scrollRestoration = "manual";
    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    const resetScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };

    resetScroll();

    let secondFrame = 0;

    const firstFrame =
      window.requestAnimationFrame(() => {
        resetScroll();

        secondFrame =
          window.requestAnimationFrame(resetScroll);
      });

    const timeoutId = window.setTimeout(
      resetScroll,
      80,
    );

    return () => {
      window.cancelAnimationFrame(firstFrame);

      if (secondFrame) {
        window.cancelAnimationFrame(secondFrame);
      }

      window.clearTimeout(timeoutId);

      window.history.scrollRestoration =
        previousRestoration;

      html.style.scrollBehavior =
        previousHtmlBehavior;

      body.style.scrollBehavior =
        previousBodyBehavior;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadMeeting() {
      if (!eventId || !signature) {
        if (!cancelled) {
          setMeeting(null);
          setError("Programarea nu există.");
          setState("invalid");
        }

        return;
      }

      try {
        const response = await fetch(
          "/api/booking/cancel",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "cancellationDetails",
              ...payload,
            }),
          },
        );

        const data =
          (await response.json()) as ApiResponse;

        if (
          response.status === 404 ||
          data.code === "NOT_FOUND" ||
          data.code === "INVALID_LINK"
        ) {
          if (!cancelled) {
            setMeeting(null);
            setError("Programarea nu există.");
            setState("invalid");
          }

          return;
        }

        if (!response.ok || !data.success) {
          throw new Error(
            data.error ||
              "Programarea nu a putut fi încărcată.",
          );
        }

        if (cancelled) {
          return;
        }

        setMeeting({
          eventId: data.eventId ?? eventId,
          title:
            data.title ??
            "Consultație online Webuilder",
          date: data.date ?? "",
          time: data.time ?? "",
          rescheduleUrl:
            data.rescheduleUrl ?? "",
        });
        setState("ready");
      } catch (requestError) {
        if (cancelled) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "A apărut o eroare.",
        );
        setState("error");
      }
    }

    void loadMeeting();

    return () => {
      cancelled = true;
    };
  }, [eventId, payload, signature]);

  async function cancelMeeting() {
    if (
      state !== "ready" ||
      !meeting
    ) {
      return;
    }

    setState("cancelling");
    setError("");

    try {
      const response = await fetch(
        "/api/booking/cancel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "cancelBooking",
            ...payload,
          }),
        },
      );

      const data =
        (await response.json()) as ApiResponse;

      if (
        response.status === 404 ||
        data.code === "NOT_FOUND" ||
        data.code === "INVALID_LINK"
      ) {
        setMeeting(null);
        setError("Programarea nu există.");
        setState("invalid");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            "Programarea nu a putut fi anulată.",
        );
      }

      setState("cancelled");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "A apărut o eroare.",
      );
      setState("ready");
    }
  }

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#080B10] px-5 pb-24 pt-28 text-white sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%)]" />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-amber-400/40 bg-[#11161D] shadow-2xl shadow-black/40 transition duration-500 hover:border-amber-400/80 hover:shadow-[0_28px_80px_rgba(250,204,21,0.10)]"
      >
        <div className="border-b border-white/10 px-7 py-6 sm:px-9">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/10 text-sm font-bold text-amber-300">
              W
            </span>

            <span className="text-base font-semibold tracking-tight text-white">
              Webuilder.ro
            </span>
          </div>
        </div>

        <div className="min-h-[470px] px-7 py-9 sm:px-9 sm:py-11">
          <AnimatePresence mode="wait">
            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                className="flex min-h-[390px] flex-col items-center justify-center text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9,
                    ease: "linear",
                  }}
                  className="mx-auto h-9 w-9 rounded-full border-2 border-white/10 border-t-yellow-400"
                />
                <p className="mt-5 text-sm text-white/45">
                  Verificăm programarea...
                </p>
              </motion.div>
            )}

            {(state === "ready" ||
              state === "cancelling") &&
              meeting && (
                <motion.div
                  key="ready"
                  initial={{
                    opacity: 0,
                    y: 14,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -14,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-yellow-400">
                    Anulare programare
                  </p>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                    Anulezi întâlnirea?
                  </h1>

                  <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
                    Programarea va fi eliminată din
                    calendar, iar intervalul va deveni
                    din nou disponibil.
                  </p>

                  <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5 transition duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.03] hover:shadow-lg hover:shadow-amber-400/5">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/35">
                      {meeting.title}
                    </p>

                    <p className="mt-3 text-xl font-bold">
                      {meeting.date} · {meeting.time}
                    </p>

                    <p className="mt-1 text-sm text-white/40">
                      Durată: 30 minute
                    </p>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                    >
                      {error}
                    </motion.p>
                  )}

                  {meeting.rescheduleUrl && (
                    <Link
                      href={meeting.rescheduleUrl}
                      className="mt-7 flex w-full items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/[0.08] px-6 py-4 text-sm font-extrabold text-amber-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/70 hover:bg-amber-400/[0.14] hover:text-amber-200"
                    >
                      Reprogramează întâlnirea
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={cancelMeeting}
                    disabled={state === "cancelling"}
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-4 text-sm font-extrabold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 active:translate-y-0 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {state === "cancelling" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            ease: "linear",
                          }}
                          className="mr-3 h-4 w-4 rounded-full border-2 border-black/20 border-t-black"
                        />
                        Se anulează...
                      </>
                    ) : (
                      "Anulează programarea"
                    )}
                  </button>

                  <p className="mt-5 text-center text-xs leading-5 text-white/30">
                    Închide pagina pentru a păstra
                    programarea.
                  </p>
                </motion.div>
              )}

            {state === "cancelled" && (
              <motion.div
                key="cancelled"
                initial={{
                  opacity: 0,
                  y: 16,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-8 text-center"
              >
                <motion.div
                  initial={{
                    scale: 0.45,
                    opacity: 0,
                    rotate: -18,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 19,
                  }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-3xl font-black text-black"
                >
                  ✓
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-6 text-3xl font-extrabold tracking-[-0.04em]"
                >
                  Meeting anulat
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="mx-auto mt-4 max-w-sm text-sm leading-7 text-white/50 sm:text-base"
                >
                  Programarea a fost anulată. Acum poți
                  închide această pagină.
                </motion.p>
              </motion.div>
            )}


            {state === "invalid" && (
              <motion.div
                key="invalid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[390px] flex-col items-center justify-center text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15 text-2xl font-black text-amber-300">
                  !
                </div>

                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.24em] text-amber-300">
                  Link indisponibil
                </p>

                <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">
                  Programarea nu există
                </h1>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-white/45 sm:text-base">
                  Programarea a fost deja anulată, a expirat
                  sau linkul nu mai este valid.
                </p>

                <Link
                  href="/"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3.5 text-sm font-extrabold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 active:translate-y-0 active:scale-[0.99]"
                >
                  Înapoi acasă
                </Link>
              </motion.div>
            )}

            {state === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-400/15 text-2xl font-black text-red-300">
                  !
                </div>

                <h1 className="mt-5 text-2xl font-extrabold">
                  Nu am putut încărca programarea
                </h1>

                <p className="mt-3 text-sm leading-7 text-white/45">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </main>
  );
}