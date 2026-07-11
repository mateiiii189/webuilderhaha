"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Slot = {
  startIso: string;
  endIso: string;
  label: string;
};

type FormData = {
  name: string;
  email: string;
  project: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  project?: string;
};

type Step = "booking" | "pin" | "success";

const WEEK_DAYS = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];

const PANEL_TRANSITION = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] as const,
};

const PANEL_VARIANTS = {
  initial: {
    opacity: 0,
    y: 14,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

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
  }).format(new Date(`${dateKey}T12:00:00`));
}

function shortDateLabel(dateKey: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
  }).format(new Date(`${dateKey}T12:00:00`));
}

function StepPill({
  index,
  label,
  active,
  complete,
}: {
  index: number;
  label: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <motion.span
        layout
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
          complete
            ? "border-yellow-400 bg-yellow-400 text-black"
            : active
              ? "border-yellow-400/60 bg-yellow-400/10 text-yellow-300"
              : "border-white/10 bg-white/[0.03] text-white/35",
        ].join(" ")}
        animate={{
          scale: complete ? [1, 0.9, 1.08, 1] : 1,
        }}
        transition={{
          duration: 0.28,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={complete ? "complete" : `step-${index}`}
            initial={{ opacity: 0, scale: 0.65, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.65, rotate: 20 }}
            transition={{ duration: 0.16 }}
          >
            {complete ? "✓" : index}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      <span
        className={[
          "truncate text-sm font-medium transition",
          active || complete ? "text-white" : "text-white/35",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-200"
    >
      {message}
    </div>
  );
}

export function BookingCalendar() {
  const today = useMemo(() => {
    const value = new Date();
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);

  const maximumDate = useMemo(() => {
    const value = new Date(today);
    value.setDate(value.getDate() + 60);
    return value;
  }, [today]);

  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    project: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [token, setToken] = useState("");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<Step>("booking");
  const [verificationComplete, setVerificationComplete] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const monthDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const mondayBasedOffset = (firstDay.getDay() + 6) % 7;

    const values: Array<Date | null> = [];

    for (let index = 0; index < mondayBasedOffset; index += 1) {
      values.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day += 1) {
      values.push(new Date(year, month, day));
    }

    return values;
  }, [visibleMonth]);

  const canGoPrevious = useMemo(() => {
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return visibleMonth > currentMonth;
  }, [today, visibleMonth]);

  const canGoNext = useMemo(() => {
    const maxMonth = new Date(
      maximumDate.getFullYear(),
      maximumDate.getMonth(),
      1,
    );

    return visibleMonth < maxMonth;
  }, [maximumDate, visibleMonth]);

  function validateForm() {
    const nextErrors: FormErrors = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const project = form.project.trim();

    if (name.length < 2) {
      nextErrors.name = "Introdu numele complet.";
    }

    if (!email) {
      nextErrors.email = "Introdu adresa de email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Introdu o adresă de email validă.";
    }

    if (project.length < 10) {
      nextErrors.project =
        "Descrie proiectul în cel puțin 10 caractere.";
    }

    setFormErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function clearFieldError(field: keyof FormErrors) {
    setFormErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  async function selectDate(date: Date) {
    const dateKey = formatDateKey(date);

    setSelectedDate(dateKey);
    setSelectedSlot(null);
    setSlots([]);
    setError("");
    setLoadingSlots(true);

    try {
      const response = await fetch("/api/booking/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: dateKey,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Disponibilitatea nu a putut fi citită.",
        );
      }

      setSlots(data.slots ?? []);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "A apărut o eroare.",
      );
    } finally {
      setLoadingSlots(false);
    }
  }

  async function sendPin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedSlot) {
      setError("Selectează mai întâi o dată și o oră.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/booking/send-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          project: form.project.trim(),
          startIso: selectedSlot.startIso,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Codul nu a putut fi trimis.");
      }

      setToken(data.token);
      setStep("pin");
      setPin("");
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

  async function verifyPin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{6}$/.test(pin)) {
      setError("Introdu codul complet format din 6 cifre.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/booking/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          pin,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Codul introdus nu este valid.");
      }

      // PIN-ul este deja confirmat de server în acest punct.
      // Oprim imediat starea de procesare și afișăm bifa.
      setLoading(false);
      setVerificationComplete(true);

      // Așteptăm ca React să afișeze efectiv bifa în pagină,
      // apoi aplicăm delay-ul înainte de ecranul final.
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => resolve());
        });
      });

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 1000);
      });

      setStep("success");
    } catch (requestError) {
      setLoading(false);
      setVerificationComplete(false);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "A apărut o eroare.",
      );
    }
  }

  function previousMonth() {
    if (!canGoPrevious) {
      return;
    }

    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  }

  function nextMonth() {
    if (!canGoNext) {
      return;
    }

    setVisibleMonth(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  }

  if (step === "success") {
    return (
      <motion.section
        key="success"
        variants={PANEL_VARIANTS}
        initial="initial"
        animate="animate"
        transition={PANEL_TRANSITION}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#11161D] px-6 py-10 shadow-[0_35px_100px_rgba(0,0,0,0.35)] sm:px-10 sm:py-14"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-52 w-96 rounded-full bg-amber-400/[0.08] blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-400 text-2xl font-black text-black">
              ✓
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Programare finalizată
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Programarea a fost confirmată.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Detaliile programării și linkul Google Meet au fost trimise la
              adresa ta de email.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                Data
              </p>

              <p className="mt-3 text-lg font-semibold capitalize text-white">
                {selectedDate
                  ? fullDateLabel(selectedDate)
                  : "Data confirmată"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                Ora
              </p>

              <p className="mt-3 text-lg font-semibold text-white">
                {selectedSlot?.label ?? "Ora confirmată"}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.04]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/[0.08] font-bold text-amber-300">
                M
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Link Google Meet trimis
                </p>

                <p className="mt-1 text-sm leading-6 text-white/45">
                  Intră în întâlnire folosind aceeași adresă de email cu care ai
                  făcut programarea.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-black transition duration-500 hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Înapoi la pagina principală
            </Link>
          </div>

        </div>
      </motion.section>
    );
  }

  const bookingStepActive = step === "booking";
  const pinStepActive = step === "pin";

  return (
    <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[#11161D] shadow-[0_35px_100px_rgba(0,0,0,0.35)]">
      <div className="border-b border-white/10 px-5 py-5 sm:px-8">
        <div className="space-y-4 sm:hidden">
          <StepPill
            index={1}
            label="Alege data și ora"
            active={bookingStepActive && !selectedSlot}
            complete={Boolean(selectedSlot)}
          />

          <StepPill
            index={2}
            label="Completează detaliile"
            active={bookingStepActive && Boolean(selectedSlot)}
            complete={pinStepActive}
          />

          <StepPill
            index={3}
            label="Verifică emailul"
            active={pinStepActive && !verificationComplete}
            complete={verificationComplete}
          />
        </div>

        <div className="hidden items-center sm:flex">
          <StepPill
            index={1}
            label="Alege data și ora"
            active={bookingStepActive && !selectedSlot}
            complete={Boolean(selectedSlot)}
          />

          <div className="mx-4 h-px min-w-8 flex-1 overflow-hidden bg-white/10">
            <motion.div
              initial={false}
              animate={{ width: selectedSlot ? "100%" : "0%" }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full bg-amber-400"
            />
          </div>

          <StepPill
            index={2}
            label="Completează detaliile"
            active={bookingStepActive && Boolean(selectedSlot)}
            complete={pinStepActive}
          />

          <div className="mx-4 h-px min-w-8 flex-1 overflow-hidden bg-white/10">
            <motion.div
              initial={false}
              animate={{ width: pinStepActive || verificationComplete ? "100%" : "0%" }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full bg-amber-400"
            />
          </div>

          <StepPill
            index={3}
            label="Verifică emailul"
            active={pinStepActive && !verificationComplete}
            complete={verificationComplete}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === "booking" ? (
        <motion.div
            key="booking"
            variants={PANEL_VARIANTS}
            initial={false}
            animate="animate"
            exit="exit"
            transition={PANEL_TRANSITION}
            className="grid xl:grid-cols-[1.05fr_0.72fr_1fr]"
            >
          <div className="border-b border-white/10 p-5 sm:p-7 xl:border-b-0 xl:border-r">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                  Pasul 1
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
                const outsideWindow = date < today || date > maximumDate;
                const disabled = weekend || outsideWindow;
                const selected = selectedDate === dateKey;
                const isToday = formatDateKey(date) === formatDateKey(today);

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
              Programările sunt disponibile de luni până vineri, cu minimum
              4 ore înainte.
            </p>
          </div>

          <div className="border-b border-white/10 p-5 sm:p-7 xl:border-b-0 xl:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
              Ore disponibile
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {selectedDate
                ? fullDateLabel(selectedDate)
                : "Alege o zi"}
            </h3>

            <div className="mt-6">
              {!selectedDate ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-black/10 px-4 py-8 text-center text-sm leading-6 text-white/35">
                  Selectează o zi din calendar pentru a vedea intervalele
                  disponibile.
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

          <div className="p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
              Detaliile tale
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Completează formularul
            </h3>

            {selectedSlot && selectedDate ? (
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.06] px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Programare selectată
                  </p>
                  <p className="mt-1 capitalize text-sm font-medium text-white/80">
                    {shortDateLabel(selectedDate)} · {selectedSlot.label}
                  </p>
                </div>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-sm font-black text-black">
                  ✓
                </span>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm leading-6 text-white/35">
                Selectează data și ora pentru a activa formularul.
              </div>
            )}

            <form onSubmit={sendPin} noValidate className="mt-6">
              <fieldset
                disabled={!selectedSlot || loading}
                className="space-y-4 disabled:opacity-50"
              >
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-white/55">
                    Nume complet
                  </span>

                  <input
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    aria-invalid={Boolean(formErrors.name)}
                    onChange={(event) => {
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }));
                      clearFieldError("name");
                    }}
                    className={[
                      "booking-input w-full appearance-none rounded-2xl border bg-[#0B0F14] px-4 py-3.5 text-sm text-white outline-none ring-0 transition duration-300 placeholder:text-white/20 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
                      formErrors.name
                        ? "border-red-400/60 focus:border-amber-400/50"
                        : "border-white/10 focus:border-amber-400/50",
                    ].join(" ")}
                    placeholder="Numele tău"
                  />

                  {formErrors.name && (
                    <p className="mt-2 text-xs text-red-300">
                      {formErrors.name}
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-white/55">
                    Adresa de email
                  </span>

                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    aria-invalid={Boolean(formErrors.email)}
                    onChange={(event) => {
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }));
                      clearFieldError("email");
                    }}
                    className={[
                      "booking-input w-full appearance-none rounded-2xl border bg-[#0B0F14] px-4 py-3.5 text-sm text-white outline-none ring-0 transition duration-300 placeholder:text-white/20 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
                      formErrors.email
                        ? "border-red-400/60 focus:border-amber-400/50"
                        : "border-white/10 focus:border-amber-400/50",
                    ].join(" ")}
                    placeholder="nume@email.ro"
                  />

                  {formErrors.email && (
                    <p className="mt-2 text-xs text-red-300">
                      {formErrors.email}
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-white/55">
                    Despre proiect
                  </span>

                  <textarea
                    rows={4}
                    value={form.project}
                    aria-invalid={Boolean(formErrors.project)}
                    onChange={(event) => {
                      setForm((current) => ({
                        ...current,
                        project: event.target.value,
                      }));
                      clearFieldError("project");
                    }}
                    className={[
                      "booking-input w-full resize-none appearance-none rounded-2xl border bg-[#0B0F14] px-4 py-3.5 text-sm leading-6 text-white outline-none ring-0 transition duration-300 placeholder:text-white/20 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
                      formErrors.project
                        ? "border-red-400/60 focus:border-amber-400/50"
                        : "border-white/10 focus:border-amber-400/50",
                    ].join(" ")}
                    placeholder="Tipul site-ului, obiective, funcționalități..."
                  />

                  {formErrors.project && (
                    <p className="mt-2 text-xs text-red-300">
                      {formErrors.project}
                    </p>
                  )}
                </label>
              </fieldset>

              {error && (
                <div className="mt-4">
                  <ErrorMessage message={error} />
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !selectedSlot}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-4 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
              >
                {loading
                  ? "Trimitem codul..."
                  : "Continuă și verifică emailul"}
              </button>

              <p className="mt-3 text-center text-[11px] leading-5 text-white/30">
                Vei primi un cod unic de verificare de la
                no-reply@webuilder.ro.
              </p>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="pin"
          variants={PANEL_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={PANEL_TRANSITION}
          className="grid lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="border-b border-white/10 bg-black/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
              Rezumat
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Verifică programarea
            </h2>

            <div className="mt-7 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]">
                <p className="text-xs uppercase tracking-wider text-white/30">
                  Data și ora
                </p>
                <p className="mt-2 capitalize text-white/85">
                  {selectedDate
                    ? fullDateLabel(selectedDate)
                    : "Data selectată"}
                </p>
                <p className="mt-1 font-semibold text-yellow-300">
                  {selectedSlot?.label}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]">
                <p className="text-xs uppercase tracking-wider text-white/30">
                  Email
                </p>
                <p className="mt-2 break-all text-white/85">
                  {form.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep("booking");
                setPin("");
                setError("");
                setVerificationComplete(false);
              }}
              className="group mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-gray-400 transition duration-500 hover:-translate-x-1 hover:text-amber-300"
            >
              <span className="text-lg leading-none">←</span>
              Înapoi la formular
            </button>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Verificarea emailului
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Introdu codul primit
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/50">
                Am trimis un cod de 6 cifre la{" "}
                <strong className="font-semibold text-white">
                  {form.email}
                </strong>
                . Codul expiră în 10 minute.
              </p>

              <form onSubmit={verifyPin} noValidate className="mt-8">
                <input
                  autoFocus
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={pin}
                  onChange={(event) => {
                    setPin(event.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                  className="booking-input w-full appearance-none rounded-2xl border border-white/10 bg-[#0B0F14] px-5 py-5 text-center text-3xl font-bold tracking-[0.55em] text-white outline-none ring-0 transition duration-300 placeholder:text-white/15 focus:border-amber-400/50 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  placeholder="000000"
                  aria-label="Cod de verificare"
                />

                {error && (
                  <div className="mt-4">
                    <ErrorMessage message={error} />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || pin.length !== 6}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-4 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
                >
                  {loading
                    ? "Creăm programarea..."
                    : "Confirmă programarea"}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-white/30">
                  Nu închide pagina până când programarea nu este confirmată.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </section>
  );
}