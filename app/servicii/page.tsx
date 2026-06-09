import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Servicii creare website | Webuilder.ro",
  description:
    "Servicii de creare website pentru firme: website de prezentare, landing page, website cu programări și redesign website. Structură SEO, design modern și focus pe lead-uri.",
};

const services = [
  {
    title: "Website de prezentare",
    description:
      "Pentru firme care vor o imagine profesională, pagini clare și o prezență online solidă.",
    href: "/website-de-prezentare",
    points: ["Pagini SEO", "Design responsive", "Formular contact", "Pagini legale"],
  },
  {
    title: "Landing page",
    description:
      "Pentru campanii, servicii specifice sau oferte care trebuie să transforme vizitatorii în lead-uri.",
    href: "/landing-page",
    points: ["CTA clar", "Structură de conversie", "Viteză bună", "SEO tehnic"],
  },
  {
    title: "Website cu programări",
    description:
      "Pentru saloane, clinici, consultanți și afaceri care au nevoie de rezervări online.",
    href: "/website-cu-programari",
    points: ["Formular programări", "WhatsApp/email", "Calendar opțional", "Lead system"],
  },
  {
    title: "Redesign website",
    description:
      "Pentru firme care au deja un site, dar acesta arată vechi, se mișcă greu sau nu aduce clienți.",
    href: "/redesign-website",
    points: ["Design modern", "Mobile-first", "SEO cleanup", "Viteză mai bună"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Servicii
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Servicii de creare website pentru afaceri moderne.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Construim website-uri rapide, clare și optimizate SEO pentru firme
              care vor să arate profesionist și să transforme vizitatorii în
              cereri de ofertă.
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

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="Ce construim"
            title="Alege serviciul potrivit pentru obiectivul tău"
            description="Fiecare tip de website are alt scop. De aceea, alegem structura după ce vrei să obții: imagine, lead-uri, programări sau conversii."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <Link key={service.href} href={service.href}>
                <Card className="h-full transition hover:border-amber-400/40 hover:bg-white/[0.05]">
                  <h2 className="text-2xl font-semibold text-white">
                    {service.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-gray-400">
                    {service.description}
                  </p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <li key={point} className="text-sm text-gray-300">
                        ✓ {point}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 text-sm font-semibold text-amber-300">
                    Vezi detalii →
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <Panel>
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                SEO-first
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Nu construim doar pagini frumoase. Construim structură.
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Pentru fiecare proiect stabilim paginile importante, URL-urile,
                titlurile SEO, H1-urile, CTA-urile și structura de linkuri interne.
                Asta ajută site-ul să fie mai clar pentru utilizatori și mai ușor
                de înțeles pentru Google.
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