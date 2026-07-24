import type { Metadata } from "next";
import { Suspense } from "react";
import RescheduleClient from "./RescheduleClient";

export const metadata: Metadata = {
  title: "Reprogramare întâlnire | Webuilder.ro",
  description:
    "Schimbă data și ora unei programări Webuilder existente.",
};

function LoadingFallback() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-[#080B10] px-5 pb-24 pt-28 text-white sm:pt-32">
      <div className="w-full max-w-5xl rounded-[28px] border border-amber-400/35 bg-[#11161D] p-10 text-center">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400" />
        <p className="mt-5 text-sm text-white/45">
          Verificăm programarea...
        </p>
      </div>
    </main>
  );
}

export default function ReschedulePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RescheduleClient />
    </Suspense>
  );
}
