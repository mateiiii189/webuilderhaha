import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Gauge,
  PlugZap,
  Target,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Servicii web pentru firme | Webuilder.ro",
  description:
    "Servicii complete de strategie, design, dezvoltare web, SEO tehnic, performanță și integrări pentru firme care vor o prezență online solidă.",
};

const serviceCategories = [
  {
    title: "Design & dezvoltare web",
    description:
      "Construim website-uri custom, adaptate brandului, obiectivelor și modului în care funcționează afacerea.",
    icon: Code2,
    points: [
      "Website-uri custom",
      "Landing pages",
      "Magazine online",
      "Platforme web",
    ],
  },
  {
    title: "Strategie & conversie",
    description:
      "Organizăm conținutul și traseul utilizatorului astfel încât website-ul să fie clar și să genereze acțiuni.",
    icon: Target,
    points: [
      "Arhitectură de pagini",
      "UX și traseu utilizator",
      "CTA-uri și formulare",
      "Structură de conținut",
    ],
  },
  {
    title: "SEO tehnic & performanță",
    description:
      "Construim fundația tehnică necesară pentru viteză, indexare corectă și o experiență bună pe orice dispozitiv.",
    icon: Gauge,
    points: [
      "Structură SEO",
      "Optimizare viteză",
      "Mobile-first",
      "Analytics și tracking",
    ],
  },
  {
    title: "Integrări & optimizare",
    description:
      "Conectăm website-ul cu instrumentele firmei și îl îmbunătățim pe măsură ce afacerea crește.",
    icon: PlugZap,
    points: [
      "Programări și calendare",
      "CRM, email și WhatsApp",
      "Plăți și automatizări",
      "Redesign și mentenanță",
    ],
  },
  {
    title: "AI & automatizări",
    description:
      "Folosim inteligența artificială și automatizările pentru a reduce munca repetitivă și a răspunde mai rapid clienților.",
    icon: Bot,
    points: [
      "Chatboți și asistenți AI",
      "Calificarea automată a lead-urilor",
      "Automatizări email și CRM",
      "Fluxuri și integrări custom",
    ],
  },
  {
    title: "Suport & dezvoltare continuă",
    description:
      "Menținem website-ul actualizat și adăugăm funcționalități noi pe măsură ce apar alte nevoi în afacere.",
    icon: PlugZap,
    points: [
      "Mentenanță tehnică",
      "Funcționalități noi",
      "Monitorizare și actualizări",
      "Optimizare continuă",
    ],
  },
];

const capabilities = [
  "Website-uri de prezentare",
  "Landing pages",
  "Magazine online",
  "Platforme web custom",
  "Website-uri multilingve",
  "Sisteme de programări",
  "Portaluri pentru clienți",
  "Cataloage online",
  "Integrări CRM",
  "Automatizări email",
  "Chatboți și asistenți AI",
  "Plăți online",
  "Analytics și tracking",
  "Redesign și migrare",
  "Bloguri și platforme editoriale",
  "Mentenanță și dezvoltare",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Servicii
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Soluții web construite în jurul afacerii tale.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              De la strategie și design până la dezvoltare, SEO și integrări,
              construim fiecare proiect în funcție de obiectivele și nevoile
              afacerii.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact">Cere ofertă</Button>

              <Button href="/preturi" variant="secondary">
                Vezi prețuri
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Categorii generale */}
      <section className="bg-[#080B10] py-24">
        <Container>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Ce facem
            </p>

            <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
              Servicii complete pentru prezența ta digitală
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
              Nu lucrăm cu o listă limitată de produse. Combinăm strategia,
              designul, dezvoltarea și optimizarea în funcție de proiect.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {serviceCategories.map((service) => {
              const Icon = service.icon;

              return (
                <Card
                  key={service.title}
                  className="group flex h-full flex-col transition duration-500 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.05]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 text-amber-300 transition duration-500 group-hover:border-amber-400/45 group-hover:bg-amber-400/15">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>

                  <h2 className="mt-7 text-[1.65rem] font-black leading-tight tracking-tight text-white">
                    {service.title}
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">
                    {service.description}
                  </p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <span className="text-amber-400">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 transition duration-500 hover:text-amber-200"
                    >
                      Discută proiectul
                      <ArrowUpRight
                        className="h-4 w-4 transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Exemple de proiecte */}
      <section className="bg-[#0B0F14] py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                Capabilități
              </p>

              <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
                Construim mai mult decât un simplu website
              </h2>

              <p className="mt-6 text-base leading-8 text-gray-300 md:text-lg">
                Funcționalitățile sunt alese și combinate în funcție de
                proiect. Nu trebuie să te încadrezi într-un tip fix de website.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-amber-400/[0.06] hover:text-amber-300"
                >
                  {capability}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SEO panel */}
      <section className="bg-[#080B10] py-24">
        <Container>
          <Panel>
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                Proiecte custom
              </p>

              <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
                Nu alegi un șablon. Construim soluția potrivită.
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Analizăm serviciile firmei, publicul, obiectivele și
                funcționalitățile necesare. Pe baza lor construim structura,
                designul și partea tehnică a proiectului.
              </p>

              <div className="mt-8">
                <Button href="/contact">Discută proiectul tău</Button>
              </div>
            </div>
          </Panel>
        </Container>
      </section>
    </main>
  );
}