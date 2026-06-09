import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Creare landing page pentru campanii și lead-uri",
  description:
    "Creăm landing page-uri rapide, moderne și orientate spre conversii pentru campanii, servicii specifice și generare de lead-uri.",
};

const useCases = [
  "campanii Google Ads sau Meta Ads",
  "promovarea unui serviciu specific",
  "lansarea unei oferte",
  "colectarea de lead-uri",
  "testarea unei idei de business",
  "programări pentru servicii",
];

const structure = [
  {
    title: "Hero clar",
    description:
      "Prima secțiune explică rapid oferta, beneficiul principal și acțiunea dorită.",
  },
  {
    title: "Beneficii",
    description:
      "Arătăm concret de ce oferta este relevantă pentru client și ce problemă rezolvă.",
  },
  {
    title: "Dovezi de încredere",
    description:
      "Review-uri, rezultate, portofoliu, garanții sau elemente care reduc neîncrederea.",
  },
  {
    title: "CTA repetat",
    description:
      "Butonul de contact, WhatsApp sau formularul trebuie să apară în momentele potrivite.",
  },
];

const differences = [
  {
    title: "Website de prezentare",
    description:
      "Prezintă firma complet: servicii, despre, portofoliu, contact și pagini SEO multiple.",
  },
  {
    title: "Landing page",
    description:
      "Are un singur obiectiv principal: să transforme vizitatorul într-un lead sau client.",
  },
];

const faqs = [
  {
    question: "Când am nevoie de landing page?",
    answer:
      "Ai nevoie de landing page când promovezi o ofertă, un serviciu sau o campanie și vrei ca vizitatorul să facă o acțiune clară.",
  },
  {
    question: "Landing page-ul este bun pentru SEO?",
    answer:
      "Poate fi optimizat tehnic, dar de obicei scopul principal este conversia. Pentru SEO pe termen lung, un website multi-page este mai puternic.",
  },
  {
    question: "Pot folosi landing page fără reclame?",
    answer:
      "Da, dar funcționează cel mai bine când trimiți trafic către el: reclame, social media, email, Google Business Profile sau outreach.",
  },
  {
    question: "Poate avea formular și WhatsApp?",
    answer:
      "Da. Landing page-ul poate include formular de contact, buton WhatsApp, telefon, email sau integrare cu un sistem de programări.",
  },
];

export default function LandingPagePage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Landing page
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Landing page-uri construite pentru conversii.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Creăm landing page-uri rapide, clare și orientate spre acțiune
              pentru campanii, oferte, servicii și generare de lead-uri.
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
            eyebrow="Scop"
            title="Un landing page are un singur obiectiv clar"
            description="Spre deosebire de un website complet, un landing page este construit pentru o acțiune specifică: cerere de ofertă, programare, apel, formular sau înscriere."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <h2 className="text-xl font-semibold text-white">
                Mai puțină distragere
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Conținutul este concentrat pe o singură ofertă, fără pagini și
                elemente inutile care pot pierde vizitatorul.
              </p>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-white">
                CTA mai puternic
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Butoanele și formularele sunt poziționate strategic ca vizitatorul
                să știe mereu ce pas urmează.
              </p>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-white">
                Testare rapidă
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Poți testa rapid o ofertă, o campanie sau un serviciu înainte să
                investești într-un website mai mare.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="Utilizare"
            title="Când are sens să construiești un landing page"
            description="Landing page-ul este potrivit când ai o ofertă clară și vrei să trimiți oamenii către o acțiune rapidă."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => (
              <Card key={item} className="p-5">
                <p className="text-sm font-medium capitalize text-gray-300">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="Structură"
            title="Structura unui landing page eficient"
            description="Nu este doar o pagină frumoasă. Fiecare secțiune trebuie să ducă vizitatorul mai aproape de acțiunea dorită."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {structure.map((item) => (
              <Card key={item.title}>
                <h2 className="text-xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="Comparație"
            title="Landing page vs website de prezentare"
            description="Alegerea depinde de obiectiv: conversie rapidă pentru o ofertă sau prezență completă pentru firmă."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {differences.map((item) => (
              <Card key={item.title}>
                <h2 className="text-2xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/website-de-prezentare" variant="secondary">
              Vezi website de prezentare
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Întrebări despre landing page-uri"
            description="Cele mai comune întrebări înainte de construirea unui landing page."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <h2 className="text-lg font-semibold text-white">
                  {faq.question}
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <Panel>
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                Start building
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Vrei un landing page pentru o ofertă sau campanie?
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Spune-ne ce vinzi, cui te adresezi și ce acțiune vrei să facă
                vizitatorul. Îți recomandăm structura potrivită.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Cere ofertă</Button>
                <Button href="/preturi" variant="secondary">
                  Vezi prețuri
                </Button>
              </div>
            </div>
          </Panel>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-10">
        <Container>
          <Link
            href="/servicii"
            className="text-sm font-medium text-amber-300 transition hover:text-amber-200"
          >
            ← Înapoi la servicii
          </Link>
        </Container>
      </section>
    </main>
  );
}