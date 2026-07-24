"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Slot = {
  startIso: string;
  endIso: string;
  label: string;
};

type MeetingDetails = {
  eventId: string;
  title: string;
  name: string;
  email: string;
  date: string;
  time: string;
  startIso: string;
};

type ViewState =
  | "loading"
  | "ready"
  | "pin"
  | "success"
  | "invalid"
  | "error";

type ApiResponse = {
  success?: boolean;
  code?: string;
  error?: string;
  eventId?: string;
  title?: string;
  name?: string;
  email?: string;
  date?: string;
  time?: string;
  startIso?: string;
  slots?: Slot[];
  token?: string;
};

const WEEK_DAYS = [
  "Lu",
  "Ma",
  "Mi",
  "Jo",
  "Vi",
  "Sâ",
  "Du",
];

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function monthTitle(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function fullDateLabel(dateKey: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(
    new Date(`${dateKey}T12:00:00`),
  );
}

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 text-sm leading-6 text-red-200"
    >
      {message}
    </div>
  );
}

export default function RescheduleClient() {
  const searchParams = useSearchParams();

  const eventId =
    searchParams.get("id") ?? "";

  const signature =
    searchParams.get("signature") ?? "";

  const today = useMemo(() => {
    const value = new Date();
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);

  const maximumDate = useMemo(() => {
    const value = new Date(today);
    value.setDate(
      value.getDate() + 60,
    );
    return value;
  }, [today]);

  const [state, setState] =
    useState<ViewState>("loading");

  const [meeting, setMeeting] =
    useState<MeetingDetails | null>(null);

  const [visibleMonth, setVisibleMonth] =
    useState(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ),
    );

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState<Slot | null>(null);

  const [slots, setSlots] =
    useState<Slot[]>([]);

  const [loadingSlots, setLoadingSlots] =
    useState(false);

  const [token, setToken] =
    useState("");

  const [pin, setPin] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [result, setResult] = useState<{
    date: string;
    time: string;
  } | null>(null);

  const availabilityAbortRef =
    useRef<AbortController | null>(null);

  const availabilityRequestIdRef =
    useRef(0);

  const payload = useMemo(
    () => ({
      eventId,
      signature,
    }),
    [eventId, signature],
  );

  useLayoutEffect(() => {
    const html =
      document.documentElement;
    const body = document.body;

    const previousRestoration =
      window.history.scrollRestoration;

    const previousHtmlBehavior =
      html.style.scrollBehavior;

    const previousBodyBehavior =
      body.style.scrollBehavior;

    window.history.scrollRestoration =
      "manual";

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

    const frame =
      window.requestAnimationFrame(
        resetScroll,
      );

    const timeout =
      window.setTimeout(
        resetScroll,
        80,
      );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      window.clearTimeout(timeout);

      window.history.scrollRestoration =
        previousRestoration;

      html.style.scrollBehavior =
        previousHtmlBehavior;

      body.style.scrollBehavior =
        previousBodyBehavior;
    };
  }, []);

  useEffect(() => {
    return () => {
      availabilityAbortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadMeeting() {
      if (!eventId || !signature) {
        if (!cancelled) {
          setState("invalid");
        }

        return;
      }

      try {
        const response = await fetch(
          "/api/booking/reschedule",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              action:
                "rescheduleDetails",
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
            setState("invalid");
          }

          return;
        }

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.error ||
              "Programarea nu a putut fi încărcată.",
          );
        }

        if (cancelled) {
          return;
        }

        const nextMeeting: MeetingDetails = {
          eventId:
            data.eventId ?? eventId,
          title:
            data.title ??
            "Consultație online Webuilder",
          name:
            data.name ?? "Client",
          email:
            data.email ?? "",
          date:
            data.date ?? "",
          time:
            data.time ?? "",
          startIso:
            data.startIso ?? "",
        };

        setMeeting(nextMeeting);

        if (nextMeeting.startIso) {
          const currentStart =
            new Date(
              nextMeeting.startIso,
            );

          if (
            !Number.isNaN(
              currentStart.getTime(),
            )
          ) {
            setVisibleMonth(
              new Date(
                currentStart.getFullYear(),
                currentStart.getMonth(),
                1,
              ),
            );
          }
        }

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
  }, [
    eventId,
    payload,
    signature,
  ]);

  const monthDays = useMemo(() => {
    const year =
      visibleMonth.getFullYear();

    const month =
      visibleMonth.getMonth();

    const firstDay =
      new Date(year, month, 1);

    const lastDay =
      new Date(
        year,
        month + 1,
        0,
      );

    const mondayBasedOffset =
      (firstDay.getDay() + 6) % 7;

    const values:
      Array<Date | null> = [];

    for (
      let index = 0;
      index < mondayBasedOffset;
      index += 1
    ) {
      values.push(null);
    }

    for (
      let day = 1;
      day <= lastDay.getDate();
      day += 1
    ) {
      values.push(
        new Date(
          year,
          month,
          day,
        ),
      );
    }

    return values;
  }, [visibleMonth]);

  const canGoPrevious =
    useMemo(() => {
      const currentMonth =
        new Date(
          today.getFullYear(),
          today.getMonth(),
          1,
        );

      return (
        visibleMonth >
        currentMonth
      );
    }, [today, visibleMonth]);

  const canGoNext =
    useMemo(() => {
      const maxMonth =
        new Date(
          maximumDate.getFullYear(),
          maximumDate.getMonth(),
          1,
        );

      return (
        visibleMonth <
        maxMonth
      );
    }, [
      maximumDate,
      visibleMonth,
    ]);

  async function selectDate(
    date: Date,
  ) {
    const dateKey =
      formatDateKey(date);

    const requestId =
      availabilityRequestIdRef.current +
      1;

    availabilityRequestIdRef.current =
      requestId;

    availabilityAbortRef.current?.abort();

    const controller =
      new AbortController();

    availabilityAbortRef.current =
      controller;

    setSelectedDate(dateKey);
    setSelectedSlot(null);
    setSlots([]);
    setError("");
    setLoadingSlots(true);

    try {
      const response = await fetch(
        "/api/booking/reschedule",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            action:
              "rescheduleAvailability",
            ...payload,
            date: dateKey,
          }),
          signal: controller.signal,
        },
      );

      const data =
        (await response.json()) as ApiResponse;

      if (
        requestId !==
        availabilityRequestIdRef.current
      ) {
        return;
      }

      if (
        response.status === 404 ||
        data.code === "NOT_FOUND" ||
        data.code === "INVALID_LINK"
      ) {
        setState("invalid");
        return;
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Disponibilitatea nu a putut fi citită.",
        );
      }

      setSlots(data.slots ?? []);
    } catch (requestError) {
      if (
        requestError instanceof
          DOMException &&
        requestError.name ===
          "AbortError"
      ) {
        return;
      }

      if (
        requestId !==
        availabilityRequestIdRef.current
      ) {
        return;
      }

      setError(
        requestError instanceof Error
          ? requestError.message
          : "A apărut o eroare.",
      );
    } finally {
      if (
        requestId ===
        availabilityRequestIdRef.current
      ) {
        setLoadingSlots(false);
      }
    }
  }

  async function sendPin() {
    if (!selectedSlot) {
      setError(
        "Selectează noua dată și oră.",
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/booking/reschedule",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            action:
              "sendReschedulePin",
            ...payload,
            startIso:
              selectedSlot.startIso,
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
        setState("invalid");
        return;
      }

      if (
        !response.ok ||
        !data.success ||
        !data.token
      ) {
        throw new Error(
          data.error ||
            "Codul nu a putut fi trimis.",
        );
      }

      setToken(data.token);
      setPin("");
      setState("pin");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "A apărut o eroare.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function verifyPin() {
    if (!/^\d{6}$/.test(pin)) {
      setError(
        "Introdu codul complet format din 6 cifre.",
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/booking/reschedule",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            action:
              "verifyReschedulePin",
            token,
            pin,
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
        setState("invalid");
        return;
      }

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Programarea nu a putut fi reprogramată.",
        );
      }

      setResult({
        date:
          data.date ?? "",
        time:
          data.time ?? "",
      });

      setState("success");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "A apărut o eroare.",
      );
    } finally {
      setLoading(false);
    }
  }

  function previousMonth() {
    if (!canGoPrevious) {
      return;
    }

    setVisibleMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          1,
        ),
    );
  }

  function nextMonth() {
    if (!canGoNext) {
      return;
    }

    setVisibleMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          1,
        ),
    );
  }

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#080B10] px-5 pb-24 pt-28 text-white sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%)]" />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-amber-400/35 bg-[#11161D] shadow-2xl shadow-black/40 transition duration-500 hover:border-amber-400/60 hover:shadow-[0_30px_90px_rgba(250,204,21,0.08)]"
      >
        <div className="border-b border-white/10 px-6 py-4 sm:px-7">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/10 text-sm font-bold text-amber-300">
              W
            </span>

            <span className="text-base font-semibold tracking-tight">
              Webuilder.ro
            </span>
          </div>
        </div>

        <div className="min-h-[560px] px-5 py-7 sm:px-9 sm:py-10">
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[480px] flex-col items-center justify-center text-center"
              >
                <div
                  aria-hidden="true"
                  className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400"
                />

                <p className="mt-5 text-sm text-white/45">
                  Verificăm programarea...
                </p>
              </motion.div>
            )}

            {state === "ready" &&
              meeting && (
                <motion.div
                  key="ready"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.42,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid xl:grid-cols-[0.78fr_1fr_0.72fr]"
                >
                  <div className="border-b border-white/10 p-5 sm:p-6 xl:border-b-0 xl:border-r">
                    <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-yellow-400">
                      Reprogramare
                    </p>

                    <h1 className="mt-4 text-3xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-[2.1rem]">
                      Alege noua dată
                    </h1>

                    <p className="mt-4 text-sm leading-7 text-white/55">
                      Linkul Google Meet rămâne același. Noua programare este
                      confirmată numai după verificarea emailului.
                    </p>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-amber-400/5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/35">
                        Programarea actuală
                      </p>

                      <p className="mt-3 text-xl font-bold">
                        {meeting.date} · {meeting.time}
                      </p>

                      <p className="mt-2 text-sm text-white/40">
                        {meeting.title} · 30 minute
                      </p>
                    </div>

                    {selectedSlot && selectedDate ? (
                      <div className="mt-3 rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] p-4 transition duration-500 hover:-translate-y-1 hover:border-amber-300/60 hover:bg-amber-400/[0.11] hover:shadow-lg hover:shadow-amber-400/10">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                          Noua programare
                        </p>

                        <p className="mt-3 capitalize font-semibold">
                          {fullDateLabel(selectedDate)} · {selectedSlot.label}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3 rounded-2xl border border-white/10 bg-black/10 p-4 text-sm leading-6 text-white/35 transition duration-500 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-white/[0.03]">
                        Selectează o zi și o oră pentru noua programare.
                      </div>
                    )}

                    {error && (
                      <div className="mt-5">
                        <ErrorMessage message={error} />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={sendPin}
                      disabled={loading || !selectedSlot}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-4 text-sm font-extrabold text-black transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/20 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                      {loading
                        ? "Trimitem codul..."
                        : "Continuă și verifică emailul"}
                    </button>
                  </div>

                  <div className="border-b border-white/10 p-5 sm:p-6 xl:border-b-0 xl:border-r">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                          Alege data
                        </p>

                        <h2 className="mt-2 text-xl font-semibold capitalize">
                          {monthTitle(visibleMonth)}
                        </h2>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={previousMonth}
                          disabled={!canGoPrevious}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-lg text-gray-300 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0 disabled:hover:border-white/10 disabled:hover:bg-white/[0.03] disabled:hover:text-gray-300"
                          aria-label="Luna anterioară"
                        >
                          ←
                        </button>

                        <button
                          type="button"
                          onClick={nextMonth}
                          disabled={!canGoNext}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-lg text-gray-300 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0 disabled:hover:border-white/10 disabled:hover:bg-white/[0.03] disabled:hover:text-gray-300"
                          aria-label="Luna următoare"
                        >
                          →
                        </button>
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-7 gap-2">
                      {WEEK_DAYS.map((day) => (
                        <div
                          key={day}
                          className="pb-2 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30"
                        >
                          {day}
                        </div>
                      ))}

                      {monthDays.map((date, index) => {
                        if (!date) {
                          return <div key={`empty-${index}`} />;
                        }

                        const dateKey = formatDateKey(date);
                        const day = date.getDay();
                        const weekend = day === 0 || day === 6;
                        const outside =
                          date < today || date > maximumDate;
                        const disabled = weekend || outside;
                        const selected = selectedDate === dateKey;
                        const isToday =
                          formatDateKey(date) === formatDateKey(today);

                        return (
                          <button
                            key={dateKey}
                            type="button"
                            disabled={disabled}
                            onClick={() => selectDate(date)}
                            className={[
                              "relative aspect-square rounded-2xl border text-sm font-semibold transition duration-500",
                              selected
                                ? "border-amber-400 bg-amber-400 text-black"
                                : "border-white/10 bg-white/[0.03] text-gray-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] hover:text-white",
                              disabled
                                ? "cursor-not-allowed opacity-20 hover:translate-y-0 hover:border-white/10 hover:bg-white/[0.03] hover:text-gray-300"
                                : "",
                            ].join(" ")}
                          >
                            {date.getDate()}

                            {isToday && !selected && (
                              <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-yellow-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-6 text-xs leading-5 text-white/30">
                      Programările sunt disponibile de luni până vineri, cu
                      minimum 4 ore înainte.
                    </p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                      Ore disponibile
                    </p>

                    <h2 className="mt-2 text-xl font-semibold capitalize">
                      {selectedDate
                        ? fullDateLabel(selectedDate)
                        : "Alege o zi"}
                    </h2>

                    <div className="mt-6">
                      {!selectedDate ? (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-black/10 px-4 py-8 text-center text-sm leading-6 text-white/35">
                          Selectează o zi din calendar pentru a vedea
                          intervalele disponibile.
                        </div>
                      ) : loadingSlots ? (
                        <div className="grid grid-cols-2 gap-3">
                          {Array.from({ length: 8 }).map((_, index) => (
                            <div
                              key={index}
                              className="h-12 animate-pulse rounded-xl border border-white/5 bg-white/[0.035]"
                            />
                          ))}
                        </div>
                      ) : slots.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-8 text-center">
                          <p className="text-sm font-medium text-white/70">
                            Nu mai sunt intervale disponibile.
                          </p>

                          <p className="mt-2 text-xs leading-5 text-white/35">
                            Alege o altă zi pentru a continua.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {slots.map((slot) => {
                            const selected =
                              selectedSlot?.startIso === slot.startIso;

                            return (
                              <button
                                key={slot.startIso}
                                type="button"
                                onClick={() => {
                                  setSelectedSlot(slot);
                                  setError("");
                                }}
                                className={[
                                  "rounded-xl border px-4 py-3.5 text-sm font-semibold transition duration-500",
                                  selected
                                    ? "border-amber-400 bg-amber-400 text-black"
                                    : "border-white/10 bg-white/[0.03] text-gray-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] hover:text-white",
                                ].join(" ")}
                              >
                                {slot.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

            {state === "pin" &&
              meeting &&
              selectedSlot &&
              selectedDate && (
                <motion.div
                  key="pin"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  className="mx-auto max-w-xl py-5"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-yellow-400">
                    Verificare email
                  </p>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">
                    Confirmă reprogramarea
                  </h1>

                  <p className="mt-4 text-sm leading-7 text-white/50">
                    Am trimis un cod de 6 cifre la{" "}
                    <strong className="text-white">
                      {meeting.email}
                    </strong>
                    .
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-amber-400/5">
                      <p className="text-xs uppercase tracking-wider text-white/35">
                        Programarea actuală
                      </p>
                      <p className="mt-2 font-semibold">
                        {meeting.date} ·{" "}
                        {meeting.time}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] p-4 transition duration-500 hover:-translate-y-1 hover:border-amber-300/60 hover:bg-amber-400/[0.11] hover:shadow-lg hover:shadow-amber-400/10">
                      <p className="text-xs uppercase tracking-wider text-amber-300">
                        Noua programare
                      </p>
                      <p className="mt-2 capitalize font-semibold">
                        {fullDateLabel(
                          selectedDate,
                        )}{" "}
                        · {selectedSlot.label}
                      </p>
                    </div>
                  </div>

                  <input
                    autoFocus
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={pin}
                    onChange={(event) => {
                      setPin(
                        event.target.value.replace(
                          /\D/g,
                          "",
                        ),
                      );
                      setError("");
                    }}
                    className="mt-7 w-full rounded-2xl border border-white/10 bg-[#0B0F14] px-5 py-5 text-center text-3xl font-bold tracking-[0.55em] text-white outline-none transition focus:border-amber-400/50"
                    placeholder="000000"
                  />

                  {error && (
                    <div className="mt-4">
                      <ErrorMessage
                        message={error}
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={verifyPin}
                    disabled={
                      loading ||
                      pin.length !== 6
                    }
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-4 text-sm font-extrabold text-black transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/20 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:hover:shadow-none"
                  >
                    {loading
                      ? "Reprogramăm..."
                      : "Confirmă noua programare"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setState("ready");
                      setPin("");
                      setError("");
                    }}
                    className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-sm font-semibold text-white/55 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/35 hover:bg-amber-400/[0.06] hover:text-amber-300 hover:shadow-lg hover:shadow-amber-400/5 active:translate-y-0"
                  >
                    <span className="transition duration-300 group-hover:-translate-x-1">
                      ←
                    </span>
                    Înapoi la calendar
                  </button>
                </motion.div>
              )}

            {state === "success" &&
              result && (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="flex min-h-[480px] flex-col items-center justify-center text-center"
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
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-3xl font-black text-black"
                  >
                    ✓
                  </motion.div>

                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.25em] text-amber-300">
                    Reprogramare confirmată
                  </p>

                  <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">
                    Noua dată este salvată
                  </h1>

                  <p className="mt-4 text-base text-white/50">
                    {result.date} ·{" "}
                    {result.time}
                  </p>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/40">
                    Clientul și administratorul au
                    primit emailul de reconfirmare.
                    Linkul Google Meet a rămas același.
                  </p>

                  <Link
                    href="/"
                    className="mt-7 inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3.5 text-sm font-extrabold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-yellow-300"
                  >
                    Înapoi acasă
                  </Link>
                </motion.div>
              )}

            {state === "invalid" && (
              <motion.div
                key="invalid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[480px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15 text-2xl font-black text-amber-300">
                  !
                </div>

                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.24em] text-amber-300">
                  Link indisponibil
                </p>

                <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">
                  Programarea nu există
                </h1>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">
                  Programarea a fost anulată, a
                  expirat sau linkul de
                  reprogramare nu mai este valid.
                </p>

                <Link
                  href="/"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3.5 text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:bg-yellow-300"
                >
                  Înapoi acasă
                </Link>
              </motion.div>
            )}

            {state === "error" && (
              <motion.div
                key="error"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="flex min-h-[480px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-400/15 text-2xl font-black text-red-300">
                  !
                </div>

                <h1 className="mt-5 text-2xl font-extrabold">
                  Nu am putut încărca programarea
                </h1>

                <p className="mt-3 max-w-md text-sm leading-7 text-white/45">
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