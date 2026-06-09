import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează Webuilder.ro pentru creare website, landing page, redesign website sau website cu programări.",
};

const projectTypes = [
  "Website de prezentare",
  "Landing page",
  "Website cu programări",
  "Redesign website",
  "Nu știu încă",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Contact
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Hai să construim website-ul afacerii tale.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
              Spune-ne ce tip de website ai nevoie și îți recomandăm o structură
              clară, SEO-first, potrivită pentru obiectivele tale.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr] lg:items-start">
            <Card>
              <SectionHeading
                eyebrow="Cerere ofertă"
                title="Completează detaliile proiectului"
                description="Formularul este pregătit vizual. Într-un pas următor îl conectăm la email prin Resend."
              />

              <form className="mt-10 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Nume
                    </label>
                    <input
                      type="text"
                      placeholder="Numele tău"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-amber-400/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Firmă
                    </label>
                    <input
                      type="text"
                      placeholder="Numele firmei"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-amber-400/50"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="contact@firma.ro"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-amber-400/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      placeholder="+40..."
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-amber-400/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300">
                    Tip proiect
                  </label>
                  <select className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0B0F14] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400/50">
                    {projectTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300">
                    Mesaj
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Spune-ne ce vrei să construim, ce servicii oferi și ce obiectiv ai."
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-amber-400/50"
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300 md:w-auto"
                >
                  Trimite cererea
                </button>

                <p className="text-xs leading-6 text-gray-500">
                  Formularul va fi conectat la email în pasul următor. Până atunci,
                  poți folosi contactul direct.
                </p>
              </form>
            </Card>

            <div className="space-y-6">
              <Card>
                <h2 className="text-2xl font-semibold text-white">
                  Contact direct
                </h2>

                <div className="mt-6 space-y-4 text-sm text-gray-300">
                  <p>Email: {siteConfig.email}</p>
                  <p>Telefon: {siteConfig.phone}</p>
                  <p>Website: webuilder.ro</p>
                </div>

                <div className="mt-8">
                  <Button href={siteConfig.whatsapp}>Scrie pe WhatsApp</Button>
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-semibold text-white">
                  Ce să trimiți pentru o ofertă rapidă
                </h2>

                <ul className="mt-6 space-y-3 text-sm text-gray-300">
                  <li>✓ tipul firmei</li>
                  <li>✓ serviciile principale</li>
                  <li>✓ dacă ai deja domeniu</li>
                  <li>✓ exemple de site-uri care îți plac</li>
                  <li>✓ buget orientativ, dacă există</li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <Panel>
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                Next step
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Nu știi exact ce website ai nevoie?
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Trimite-ne câteva detalii despre firmă și îți recomandăm cea mai
                simplă structură care are sens pentru obiectivul tău.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/servicii">Vezi serviciile</Button>
                <Button href="/preturi" variant="secondary">
                  Vezi prețuri
                </Button>
              </div>
            </div>
          </Panel>
        </Container>
      </section>
    </main>
  );
}