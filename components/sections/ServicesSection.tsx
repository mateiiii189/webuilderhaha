import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Code2,
  Compass,
  Gauge,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stages = [
  {
    index: "01",
    title: "Clarificăm direcția",
    description:
      "Înțelegem oferta, publicul și obiectivul real al proiectului înainte să desenăm primul ecran.",
    icon: Compass,
    points: [
      "Strategie și poziționare",
      "Structură orientată spre conversie",
    ],
  },
  {
    index: "02",
    title: "Construim experiența",
    description:
      "Transformăm direcția într-un website custom, coerent, rapid și ușor de folosit.",
    icon: Code2,
    points: [
      "Design și dezvoltare web",
      "Responsive, accesibil și scalabil",
    ],
  },
  {
    index: "03",
    title: "Lansăm corect",
    description:
      "Pregătim fundația tehnică pentru performanță, indexare și integrarea instrumentelor necesare.",
    icon: Gauge,
    points: [
      "SEO tehnic și performanță",
      "Integrări, tracking și optimizare",
    ],
  },
  {
    index: "04",
    title: "Creștem și automatizăm",
    description:
      "După lansare, continuăm cu automatizări, funcții noi și îmbunătățiri bazate pe rezultate.",
    icon: Bot,
    points: [
      "AI și automatizări",
      "Suport și dezvoltare continuă",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#080B10] py-20 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-amber-400/[0.07] blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />

      <Container className="relative">
        <ScrollReveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-400">
                Servicii
              </p>

              <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white md:text-5xl">
                De la idee la creștere, acoperim tot traseul digital.
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">
                Nu vindem doar pagini. Legăm strategia, designul, dezvoltarea,
                SEO-ul și automatizările într-un sistem construit în jurul
                afacerii tale.
              </p>
            </div>

            <Link
              href="/servicii"
              className="group/button inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-7 text-sm font-black text-amber-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-black"
            >
              Explorează serviciile

              <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="relative mt-12">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <ScrollReveal
                  key={stage.index}
                  delay={index * 0.07}
                >
                  <article className="group relative flex h-full min-h-[330px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.045]">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition duration-300 group-hover:border-amber-400/55">
                        <Icon className="h-5 w-5" strokeWidth={2.1} />
                      </div>

                      <span className="text-xs font-black tracking-[0.2em] text-white/25 transition duration-300 group-hover:text-amber-300/70">
                        {stage.index}
                      </span>
                    </div>

                    <h3 className="mt-7 text-2xl font-black tracking-[-0.04em] text-white transition duration-500 group-hover:text-amber-300">
                      {stage.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-400">
                      {stage.description}
                    </p>

                    <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
                      {stage.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 text-sm leading-6 text-gray-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}