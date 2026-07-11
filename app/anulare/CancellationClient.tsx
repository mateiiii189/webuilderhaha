"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type MeetingDetails = {
  eventId: string;
  title: string;
  date: string;
  time: string;
};

type ViewState =
  | "loading"
  | "ready"
  | "cancelling"
  | "cancelled"
  | "error";

type ApiResponse = {
  success: boolean;
  code?: string;
  error?: string;
  eventId?: string;
  title?: string;
  date?: string;
  time?: string;
};

export default function CancellationClient() {
  const router = useRouter();
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

  useEffect(() => {
    let cancelled = false;

    async function loadMeeting() {
      if (!eventId || !signature) {
        router.replace("/anulare/indisponibila");
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
          data.code === "NOT_FOUND"
        ) {
          router.replace("/anulare/indisponibila");
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
  }, [eventId, payload, router, signature]);

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
        data.code === "NOT_FOUND"
      ) {
        router.replace("/anulare/indisponibila");
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B10] px-5 py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%)]" />

      <motion.section
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/10 bg-[#11161D] shadow-2xl shadow-black/40"
      >
        <div className="border-b border-white/10 px-7 py-6 sm:px-9">
          <img
            src="/images/w.png"
            alt="Webuilder"
            className="h-11 w-auto"
          />
        </div>

        <div className="px-7 py-9 sm:px-9 sm:py-11">
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
                className="py-12 text-center"
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

                  <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">
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

                  <motion.button
                    type="button"
                    onClick={cancelMeeting}
                    disabled={state === "cancelling"}
                    whileHover={
                      state === "cancelling"
                        ? undefined
                        : { y: -2 }
                    }
                    whileTap={
                      state === "cancelling"
                        ? undefined
                        : { scale: 0.985 }
                    }
                    className="mt-7 flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-4 text-sm font-extrabold text-black transition disabled:cursor-wait disabled:opacity-70"
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
                  </motion.button>

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
