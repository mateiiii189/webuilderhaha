import type { Metadata } from "next";
import { Suspense } from "react";
import CancellationClient from "./CancellationClient";

export const metadata: Metadata = {
  title: "Anulare programare | Webuilder",
  description:
    "Anulează programarea Webuilder.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CancellationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#080B10]" />
      }
    >
      <CancellationClient />
    </Suspense>
  );
}
