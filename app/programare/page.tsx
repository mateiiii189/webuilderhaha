import type { Metadata } from "next";
import { BookingCalendar } from "@/components/booking/BookingCalendar";

export const metadata: Metadata = {
  title: "Programează o consultație | Webuilder",
  description:
    "Alege data și ora pentru o consultație online de 30 de minute cu Webuilder.",
};

export default function ProgramarePage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] px-4 py-28 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/5 px-4 py-2 text-sm font-medium text-amber-300 transition duration-500 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-200">
            Consultație online
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Hai să discutăm despre proiectul tău.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Selectează o dată și o oră disponibile. Consultația durează
            aproximativ 30 de minute și se desfășoară prin Google Meet.
          </p>
        </div>

        <BookingCalendar />
      </div>
    </main>
  );
}