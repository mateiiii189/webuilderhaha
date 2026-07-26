import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  CheckCircle2,
  Code2,
  Gauge,
  Layers3,
  MessageSquareText,
  PenTool,
  PlugZap,
  Rocket,
  Search,
  Target,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FixedPageHero } from "@/components/layout/FixedPageHero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

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

const processSteps = [
  {
    number: "01",
    title: "Direcție și structură",
    text: "Stabilim obiectivele, publicul și traseul principal al website-ului.",
    icon: Search,
  },
  {
    number: "02",
    title: "Design și dezvoltare",
    text: "Construim experiența vizuală și implementarea tehnică.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "SEO și performanță",
    text: "Optimizăm structura, viteza și experiența pe fiecare dispozitiv.",
    icon: Gauge,
  },
  {
    number: "04",
    title: "Lansare și evoluție",
    text: "Conectăm integrările, testăm și pregătim proiectul pentru creștere.",
    icon: Rocket,
  },
];


const fullProcessSteps = [
  {
    number: "01",
    eyebrow: "Descoperire",
    title: "Obiective și context",
    description:
      "Înțelegem oferta, publicul, diferențiatorii și rezultatul pe care website-ul trebuie să îl producă.",
    deliverable: "Brief validat",
    icon: MessageSquareText,
  },
  {
    number: "02",
    eyebrow: "Strategie",
    title: "Arhitectură și trasee",
    description:
      "Stabilim paginile, ierarhia informației și drumul prin care vizitatorul ajunge la acțiunea dorită.",
    deliverable: "Structură aprobată",
    icon: Layers3,
  },
  {
    number: "03",
    eyebrow: "Experiență",
    title: "Design și conținut",
    description:
      "Transformăm direcția într-o experiență vizuală coerentă, clară și adaptată identității brandului.",
    deliverable: "Design validat",
    icon: PenTool,
  },
  {
    number: "04",
    eyebrow: "Construcție",
    title: "Dezvoltare și integrări",
    description:
      "Implementăm interfața, funcționalitățile și conexiunile necesare cu instrumentele folosite de afacere.",
    deliverable: "Versiune funcțională",
    icon: Code2,
  },
  {
    number: "05",
    eyebrow: "Control",
    title: "Testare și optimizare",
    description:
      "Verificăm fluxurile, responsive-ul, viteza, SEO-ul tehnic și comportamentul pe dispozitive reale.",
    deliverable: "Lansare pregătită",
    icon: CheckCircle2,
  },
  {
    number: "06",
    eyebrow: "Evoluție",
    title: "Lansare și dezvoltare continuă",
    description:
      "Publicăm proiectul, urmărim rezultatele și continuăm cu optimizări, automatizări sau funcții noi.",
    deliverable: "Bază pregătită pentru creștere",
    icon: Rocket,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      {/* Hero */}
      <FixedPageHero
        eyebrow="Servicii"
        title={
          <>
            Soluții web construite în jurul afacerii tale.
          </>
        }
        description={
          <>
            De la strategie și design până la dezvoltare, SEO, integrări și
            automatizări, construim fiecare proiect în funcție de obiectivele
            și nevoile reale ale afacerii.
          </>
        }
        bottom={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">
              Cere ofertă
            </Button>

            <SmoothScrollLink
              href="/servicii"
              targetId="proces"
              offset={-40}
              duration={1100}
              autoScrollOnMount
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-white transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/[0.06] hover:text-amber-300"
            >
              Vezi procesul
            </SmoothScrollLink>
          </div>
        }
        aside={
          <article className="group relative flex h-full min-w-0 flex-col rounded-[2rem] border border-white/10 bg-white/[0.075] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-white/[0.09]">
            <div className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#080B10]/95 p-5 shadow-inner shadow-black/25 md:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_4%,rgba(250,204,21,0.10),transparent_38%)]" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-6">
                  <div className="max-w-xl">
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-300/85">
                      Sistem digital complet
                    </p>

                    <h2 className="mt-3 max-w-lg text-[1.75rem] font-black leading-[1.04] tracking-[-0.04em] text-white md:text-[2rem]">
                      Un singur partener. Patru etape clare.
                    </h2>

                    <p className="mt-3 max-w-lg text-[15px] leading-6 text-gray-400">
                      Strategie, design, performanță și lansare într-un singur
                      flux de lucru, fără rupturi între etape.
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition duration-500 group-hover:border-amber-400/50 group-hover:bg-amber-400/15">
                    <Workflow
                      className="h-5 w-5"
                      strokeWidth={2.1}
                    />
                  </div>
                </div>

                <div className="mt-8 grid min-h-0 flex-1 content-start gap-2.5 sm:grid-cols-2 sm:auto-rows-[120px]">
                  {processSteps.map((step) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.number}
                        className="group/step h-full min-h-0 min-w-0 overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-3.5 transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/25 hover:bg-white/[0.06]"
                      >
                        <div className="grid min-w-0 grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-x-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/[0.08] text-amber-300 transition duration-500 group-hover/step:border-amber-400/45 group-hover/step:bg-amber-400/15">
                            <Icon
                              className="h-4 w-4"
                              strokeWidth={2.1}
                            />
                          </div>

                          <h3 className="min-w-0 text-[15px] font-black leading-[16px] tracking-[-0.02em] text-white transition-colors duration-500 group-hover/step:text-amber-300">
                            {step.title}
                          </h3>

                          <span className="text-[10px] font-black leading-none tracking-[0.18em] text-white/30 transition-colors duration-500 group-hover/step:text-amber-300/70">
                            {step.number}
                          </span>
                        </div>

                        <p className="mt-2 pl-12 text-[13px] leading-[15px] text-gray-400">
                          {step.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        }
      />

      {/* Categorii generale */}
      <section id="servicii-complete" className="bg-[#080B10] py-24">
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

                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Proces complet */}
      <section
        id="proces"
        className="relative overflow-hidden border-y border-white/10 bg-[#0B0F14] py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,rgba(250,204,21,0.07),transparent_34%)]" />

        <Container className="relative">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Procesul complet
            </p>

            <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white md:text-5xl">
              Fiecare etapă închide o decizie importantă.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
              Nu trecem mai departe până când direcția etapei curente este
              clară. Astfel reducem refacerile, blocajele și deciziile luate
              prea târziu.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {fullProcessSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.045]"
                >
                  <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-amber-400/[0.055] blur-3xl transition duration-500 group-hover:bg-amber-400/[0.1]" />

                  <div className="relative flex items-start justify-between gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition duration-500 group-hover:border-amber-400/50 group-hover:bg-amber-400/15">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={2.1}
                      />
                    </div>

                    <span className="text-sm font-black tracking-[0.22em] text-white/20 transition-colors duration-500 group-hover:text-amber-300/70">
                      {step.number}
                    </span>
                  </div>

                  <div className="relative mt-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400/80">
                      {step.eyebrow}
                    </p>

                    <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em] text-white transition-colors duration-500 group-hover:text-amber-300">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-400">
                      {step.description}
                    </p>
                  </div>

                  <div className="relative mt-auto pt-7">
                    <div className="border-t border-white/10 pt-5">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-gray-300 transition duration-300 group-hover:border-amber-400/30 group-hover:text-amber-300">
                        {step.deliverable}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href="/contact"
              className="group/cta inline-flex items-center gap-3 text-sm font-black text-amber-300 transition-colors duration-300 hover:text-amber-200"
            >
              <span className="inline-block transition-transform duration-300 group-hover/cta:-translate-y-0.5">
                Începe proiectul
              </span>

              <span className="inline-block text-lg leading-none transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-0.5">
                →
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Capabilități */}
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
                Funcționalitățile sunt alese și combinate în funcție de proiect.
                Nu trebuie să te încadrezi într-un tip fix de website.
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

      {/* Proiecte custom */}
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