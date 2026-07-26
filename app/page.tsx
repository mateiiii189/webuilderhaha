import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import {
  CheckCircle2,
  Code2,
  Rocket,
  Target,
} from "lucide-react";

const heroStages = [
  {
    icon: Target,
    title: "Strategie",
    text: "Direcție clară",
  },
  {
    icon: Code2,
    title: "Build",
    text: "Execuție rapidă",
  },
  {
    icon: Rocket,
    title: "Lansare",
    text: "Pregătit pentru live",
  },
];

const deliveryChecks = [
  "Structură aprobată",
  "Design responsive",
  "SEO tehnic pregătit",
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pb-14 pt-28 md:pb-6 md:pt-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl" />

        <Container className="relative">
          <div className="grid gap-12 lg:min-h-[500px] lg:grid-cols-[1.08fr_0.72fr] lg:items-center">
            <div className="max-w-5xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                Webuilder.ro
              </p>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[4.4rem]">
                Construim website-uri solide pentru afaceri moderne.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
                Website-uri rapide, clare și optimizate SEO pentru firme care
                vor o prezență online serioasă și mai multe cereri de ofertă.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Cere ofertă</Button>

                <Button href="/servicii" variant="secondary">
                  Vezi serviciile
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-end xl:translate-x-6">
              <div className="relative animate-float-slow transform-gpu">
                <div className="absolute -inset-6 rounded-[2.5rem] bg-amber-400/10 blur-3xl animate-glow-pulse transform-gpu" />

                <div className="relative w-full max-w-lg transform-gpu overflow-hidden rounded-[2rem] border border-amber-400/35 bg-[#11161D] p-4 shadow-2xl shadow-black/40 transition duration-500 hover:-translate-y-1 hover:border-amber-400/55">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(250,204,21,0.22),transparent_42%)]" />

                  <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#080B10]/95">
                    <div className="group/window flex items-center gap-3 border-b border-white/10 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-400/80">
                          <svg
                            viewBox="0 0 10 10"
                            className="h-2 w-2 opacity-0 transition duration-300 group-hover/window:opacity-70"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 2L8 8M8 2L2 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              className="text-red-950"
                            />
                          </svg>
                        </span>

                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-yellow-400/80">
                          <svg
                            viewBox="0 0 12 12"
                            className="h-2.5 w-2.5 opacity-0 transition duration-300 group-hover/window:opacity-70"
                            aria-hidden="true"
                          >
                            <rect
                              x="3.2"
                              y="4"
                              width="5.2"
                              height="5.2"
                              rx="0.8"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              fill="none"
                              className="text-yellow-950"
                            />
                            <path
                              d="M5 2.8H8.4C9.1 2.8 9.6 3.3 9.6 4V7.4"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-yellow-950"
                            />
                          </svg>
                        </span>

                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-400/80">
                          <svg
                            viewBox="0 0 10 10"
                            className="h-2 w-2 opacity-0 transition duration-300 group-hover/window:opacity-70"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 5H8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              className="text-green-950"
                            />
                          </svg>
                        </span>
                      </div>

                      <div className="flex min-w-0 flex-1 items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                        <span className="truncate text-[11px] font-medium text-gray-400">
                          webuilder.ro/proiect
                        </span>

                        <span className="ml-3 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Live
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4">
                        <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />

                        <div className="relative">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="inline-flex rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-300">
                              Website custom
                            </span>

                            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/30">
                              Proiect activ
                            </span>
                          </div>

                          <h2 className="mt-3 text-lg font-black leading-tight tracking-[-0.03em] text-white md:text-xl">
                            Construim un sistem digital care explică, convinge
                            și generează cereri.
                          </h2>

                          <p className="mt-2 text-sm leading-6 text-gray-400">
                            Design clar, structură SEO și dezvoltare pregătită
                            pentru creștere.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5">
                        {heroStages.map((item, index) => {
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.title}
                              className="group/stage relative flex min-h-[96px] flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-3.5 transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/30 hover:bg-white/[0.055]"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition duration-300 group-hover/stage:border-amber-400/50 group-hover/stage:bg-amber-400/15">
                                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                                </div>

                                <span className="text-[9px] font-black tracking-[0.16em] text-white/20">
                                  0{index + 1}
                                </span>
                              </div>

                              <div className="mt-3">
                                <p className="text-sm font-black leading-4.5 text-white">
                                  {item.title}
                                </p>

                                <p className="mt-1 text-[10px] leading-4 text-gray-500">
                                  {item.text}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-3.5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">
                              Status livrare
                            </p>

                            <p className="mt-1 text-sm font-bold text-white">
                              Proiectul este finalizat.
                            </p>
                          </div>

                          <span className="text-sm font-black text-amber-300">
                            100%
                          </span>
                        </div>

                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-full rounded-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.45)]" />
                        </div>

                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          {deliveryChecks.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-[11px] font-medium text-gray-400"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      <ReviewsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}