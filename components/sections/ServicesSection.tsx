import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";

const services = [
  {
    title: "Website de prezentare",
    description:
      "Pentru firme care vor o imagine profesională și o prezență online solidă.",
    href: "/website-de-prezentare",
  },
  {
    title: "Landing page",
    description:
      "Pentru campanii, servicii specifice și conversii rapide din trafic.",
    href: "/landing-page",
  },
  {
    title: "Website cu programări",
    description:
      "Pentru saloane, clinici, consultanți și afaceri bazate pe rezervări.",
    href: "/website-cu-programari",
  },
  {
    title: "Redesign website",
    description:
      "Transformăm site-ul vechi într-un website modern, rapid și clar.",
    href: "/redesign-website",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-[#080B10] py-24">
      <Container>
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
            Servicii
          </p>

          <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
            Ce construim pentru afacerea ta
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
            Fiecare pagină este gândită cu structură clară, SEO tehnic și
            obiectiv de conversie.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.href} href={service.href}>
              <Card className="h-full transition hover:border-amber-400/40 hover:bg-white/[0.05]">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-xl text-amber-300">
                  ▦
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {service.description}
                </p>

                <p className="mt-6 text-sm font-semibold text-amber-300">
                  Vezi detalii →
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}