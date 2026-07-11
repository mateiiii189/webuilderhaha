import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl" />

        <Container className="relative">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
                404 — Page not found
              </p>

              <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                Pagina asta nu există sau a fost mutată.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
                Linkul accesat nu mai este disponibil. Poți reveni la pagina
                principală sau poți vedea serviciile Webuilder.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/">Înapoi acasă</Button>

                <Button href="/servicii" variant="secondary">
                  Vezi serviciile
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </main>
  );
}