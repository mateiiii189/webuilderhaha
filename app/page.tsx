import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
    <section className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-12 lg:min-h-[500px] lg:grid-cols-[1.05fr_0.75fr] lg:items-center">
          <div className="max-w-5xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Webuilder.ro
            </p>

            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[4.4rem]">
              Construim website-uri solide pentru afaceri moderne.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
              Website-uri rapide, clare și optimizate SEO pentru firme care vor o
              prezență online serioasă și mai multe cereri de ofertă.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact">Cere ofertă</Button>
              <Button href="/servicii" variant="secondary">
                Vezi serviciile
              </Button>
            </div>

            <div className="mt-9 grid max-w-3xl gap-4 sm:grid-cols-3">
              {["Website-uri de prezentare", "Landing pages", "SEO tehnic"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

<div className="hidden lg:flex lg:justify-end xl:translate-x-6">
  {/* <div className="group relative transition duration-300 hover:-translate-y-2"> */}
    <div className="relative animate-float-slow transform-gpu">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-amber-400/10 blur-3xl animate-glow-pulse transform-gpu" />

              <div className="relative w-full max-w-md transform-gpu rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 transition duration-300 group-hover:border-amber-400/30 group-hover:bg-white/[0.06]">
                <div className="rounded-2xl border border-white/10 bg-[#080B10] p-5">
                  <div className="group/window flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-400/80">
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

                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400/80">
                      <svg
                        viewBox="0 0 10 10"
                        className="h-2 w-2 opacity-0 transition duration-300 group-hover/window:opacity-70"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 3H7V7H3V3Z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          fill="none"
                          strokeLinejoin="round"
                          className="text-yellow-950"
                        />
                      </svg>
                    </span>

                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400/80">
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

                  <div className="mt-6 space-y-4">
                    <div className="inline-flex rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-300">
                      SEO-ready website
                    </div>

                  <div className="relative overflow-hidden rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white">
                    <span className="relative z-10">
                      Construim website-uri rapide pentru firme moderne
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 left-0 w-16 -skew-x-12 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0.03)_75%,transparent_100%)] blur-sm animate-line-shimmer" />
                  </div>

                    <div className="rounded-xl bg-white/10 px-4 py-3 text-sm text-gray-300">
                      Design clar • Structură SEO • Lead-uri mai bune
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                        <p className="text-[11px] text-gray-400">Pagină</p>
                        <p className="mt-2 text-sm font-medium text-white">Homepage</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                        <p className="text-[11px] text-gray-400">Pagină</p>
                        <p className="mt-2 text-sm font-medium text-white">Servicii</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                        <p className="text-[11px] text-gray-400">Pagină</p>
                        <p className="mt-2 text-sm font-medium text-white">Contact</p>
                      </div>
                    </div>

                    <Button href="/contact" className="h-11 w-36 px-0 py-0">
                      Cere ofertă
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-400">SEO</p>
                    <p className="mt-2 text-base font-semibold text-white">Ready</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-400">Speed</p>
                    <p className="mt-2 text-base font-semibold text-white">Fast</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-400">Leads</p>
                    <p className="mt-2 text-base font-semibold text-white">Clear</p>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}
          </div>
        </div>
      </Container>
    </section>

      <ProblemSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}