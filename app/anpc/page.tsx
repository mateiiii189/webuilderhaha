import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "ANPC",
  description:
    "Informații ANPC, SAL și SOL pentru consumatori.",
};

export default function AnpcPage() {
  return (
    <LegalPage
      eyebrow="ANPC"
      title="Informații ANPC"
      description="Informații utile pentru consumatori privind Autoritatea Națională pentru Protecția Consumatorilor."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Autoritatea Națională pentru Protecția Consumatorilor
        </h2>
        <p className="leading-8">
          Pentru eventuale reclamații sau sesizări privind drepturile consumatorilor,
          vă puteți adresa Autorității Naționale pentru Protecția Consumatorilor.
        </p>
        <a
          href="https://anpc.ro"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-amber-300 transition hover:text-amber-200"
        >
          Accesează ANPC →
        </a>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Soluționarea Alternativă a Litigiilor - SAL
        </h2>
        <p className="leading-8">
          Consumatorii pot apela la mecanisme de soluționare alternativă a
          litigiilor, conform legislației aplicabile.
        </p>
        <a
          href="https://anpc.ro/ce-este-sal/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-amber-300 transition hover:text-amber-200"
        >
          Informații SAL →
        </a>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Soluționarea Online a Litigiilor - SOL
        </h2>
        <p className="leading-8">
          Consumatorii pot utiliza platforma de soluționare online a litigiilor
          pentru probleme apărute în urma achizițiilor online.
        </p>
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-amber-300 transition hover:text-amber-200"
        >
          Platforma SOL →
        </a>
      </section>
    </LegalPage>
  );
}