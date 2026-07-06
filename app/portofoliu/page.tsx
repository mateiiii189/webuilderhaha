import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioCarousel } from "@/components/sections/PortfolioCarousel";

export const metadata: Metadata = {
  title: "Portofoliu",
  description:
    "Demo-uri de website-uri construite pentru firme moderne: fitness, clinică, logistică, restaurant, imobiliare, beauty și auto.",
};

export default function PortofoliuPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Portofoliu
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Demo-uri reale, construite ca website-uri separate.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
              În loc de simple screenshot-uri, construim platforme demo reale,
              găzduite separat, ca fiecare client să poată vedea cum ar arăta
              un website complet în industria lui.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact">Vreau un demo pentru firma mea</Button>
              <Button href="/preturi" variant="secondary">
                Vezi prețuri
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="Demo-uri"
            title="Alege un demo live"
            description="Folosim aceste demo-uri ca punct de pornire pentru website-uri reale, adaptate pe nișa clientului."
          />

          <PortfolioCarousel />
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <Panel>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                  Strategie
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Pentru fiecare client putem crea un demo personalizat.
                </h2>

                <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                  Dacă firma are o nișă diferită, putem construi un demo separat:
                  construcții, consultanță, servicii medicale, transport, auto,
                  horeca sau orice alt domeniu.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#080B10] p-6">
                <p className="text-sm font-semibold text-amber-300">
                  Cum prezentăm demo-ul
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Subdomeniu separat pe Vercel",
                    "Design adaptat industriei",
                    "Structură SEO realistă",
                    "CTA-uri pentru lead-uri",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] hover:text-white"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href="/contact">Cere demo personalizat</Button>
                </div>
              </div>
            </div>
          </Panel>
        </Container>
      </section>
    </main>
  );
}