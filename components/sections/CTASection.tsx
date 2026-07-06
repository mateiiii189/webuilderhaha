import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="bg-[#080B10] py-24">
      <Container>
        <ScrollReveal>
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/20 transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05] hover:shadow-black/30 md:p-12">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 transition duration-700 group-hover:opacity-30" />

            <div className="relative max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                Start building
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Ai o afacere și vrei un website construit corect?
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Spune-ne ce servicii oferi și îți recomandăm o structură clară,
                SEO-first, potrivită pentru obiectivele tale.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Cere ofertă</Button>
                <Button href="/portofoliu" variant="secondary">
                  Vezi portofoliu
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}