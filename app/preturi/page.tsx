import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Prețuri creare website",
  description:
    "Prețuri orientative pentru creare website: landing page, website de prezentare, website cu programări și mentenanță lunară.",
};

const plans = [
  {
    name: "Landing Page",
    price: "de la 300€",
    description:
      "Pentru o ofertă, campanie, serviciu specific sau testarea unei idei.",
    features: [
      "1 pagină construită pentru conversie",
      "Design responsive",
      "CTA clar",
      "Formular contact sau WhatsApp",
      "SEO tehnic de bază",
      "Lansare pe domeniu",
    ],
  },
  {
    name: "Website Business",
    price: "de la 700€",
    description:
      "Pentru firme care vor o prezență online completă și profesionistă.",
    features: [
      "4–6 pagini principale",
      "Structură SEO",
      "Homepage + servicii + contact",
      "Formular contact",
      "Pagini legale standard",
      "Sitemap și robots",
    ],
    highlighted: true,
  },
  {
    name: "Website + Programări",
    price: "de la 1.200€",
    description:
      "Pentru firme care au nevoie de programări, lead-uri sau cereri structurate.",
    features: [
      "Website complet",
      "Formular de programare",
      "Buton WhatsApp / email",
      "Pagini de servicii",
      "SEO tehnic",
      "Flow de lead-uri mai clar",
    ],
  },
];

const extras = [
  {
    title: "Mentenanță lunară",
    price: "de la 50€/lună",
    description:
      "Actualizări mici, verificări, modificări de texte, linkuri și suport basic.",
  },
  {
    title: "Pagină suplimentară",
    price: "de la 50€",
    description:
      "Pentru servicii, locații, articole sau pagini comerciale suplimentare.",
  },
  {
    title: "Articol blog SEO",
    price: "de la 50€",
    description:
      "Articol structurat pentru întrebări comerciale și trafic organic.",
  },
  {
    title: "Redesign website",
    price: "ofertă personalizată",
    description:
      "Depinde de mărimea site-ului vechi, structură, conținut și redirecturi.",
  },
];

const faqs = [
  {
    question: "De ce prețurile sunt «de la»?",
    answer:
      "Pentru că prețul final depinde de numărul de pagini, funcționalități, conținut, formulare, animații și complexitatea structurii SEO.",
  },
  {
    question: "Domeniul și găzduirea sunt incluse?",
    answer:
      "Domeniul, găzduirea, emailul business și alte servicii externe se plătesc separat. Te putem ajuta cu setup-ul.",
  },
  {
    question: "Pot plăti în tranșe?",
    answer:
      "Pentru proiecte mai mari se poate lucra cu avans și plată finală la livrare, în funcție de proiect.",
  },
  {
    question: "Primesc factură?",
    answer:
      "Da. Serviciile pot fi facturate prin firmă, cu datele fiscale completate în ofertă.",
  },
  {
    question: "Este inclus SEO?",
    answer:
      "Este inclus SEO tehnic de bază: structură URL, title/meta, H1/H2, sitemap, robots și structură internă logică. SEO lunar sau content marketing se discută separat.",
  },
  {
    question: "Cât durează un website?",
    answer:
      "Un landing page poate fi gata mai rapid, iar un website business durează de obicei 7–14 zile, în funcție de conținut și feedback.",
  },
];

export default function PreturiPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Prețuri
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Prețuri pentru website-uri construite corect.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Pachete orientative pentru landing pages, website-uri de prezentare
              și website-uri cu programări. Prețul final depinde de structură,
              număr de pagini și funcționalități.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact">Cere ofertă exactă</Button>
              <Button href="/servicii" variant="secondary">
                Vezi serviciile
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="Pachete"
            title="Alege punctul de pornire potrivit"
            description="Nu vindem template-uri la kilogram. Fiecare pachet pornește de la o structură clară, adaptată obiectivului firmei."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
                <Card
                key={plan.name}
                className={`flex h-full flex-col ${
                    plan.highlighted
                    ? "border-amber-400/40 bg-amber-400/[0.06]"
                    : ""
                }`}
                >
                {plan.highlighted ? <Badge>Recomandat</Badge> : null}

                <h2 className="mt-5 text-2xl font-semibold text-white">
                  {plan.name}
                </h2>

                <p className="mt-4 text-4xl font-semibold text-white">
                  {plan.price}
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-gray-300">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button href="/contact" className="w-full">
                    Cere ofertă
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="Extra"
            title="Servicii suplimentare"
            description="Poți adăuga pagini, mentenanță sau conținut SEO în funcție de nevoile proiectului."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {extras.map((extra) => (
              <Card key={extra.title}>
                <h2 className="text-xl font-semibold text-white">
                  {extra.title}
                </h2>

                <p className="mt-3 text-2xl font-semibold text-amber-300">
                  {extra.price}
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {extra.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Costuri externe"
                title="Ce nu este inclus în prețul website-ului"
                description="Ca să fie totul transparent, separăm costul de dezvoltare de costurile externe precum domeniu, hosting, email sau servicii terțe."
              />

              <div className="mt-8">
                <Button href="/contact">Discută proiectul</Button>
              </div>
            </div>

            <Card>
              <div className="space-y-4 text-sm text-gray-300">
                <p>✓ Domeniu .ro / .com</p>
                <p>✓ Găzduire / Vercel Pro, dacă este cazul</p>
                <p>✓ Email business</p>
                <p>✓ Servicii externe: analytics, formulare, automatizări</p>
                <p>✓ Texte profesionale avansate, dacă sunt cerute separat</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Întrebări despre prețuri"
            description="Cele mai comune întrebări despre costuri, durată, facturare și ce este inclus."
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

      <section className="bg-[#080B10] py-24">
        <Container>
          <Panel>
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                Start building
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Nu știi ce pachet se potrivește?
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Spune-ne ce tip de firmă ai, ce servicii vinzi și ce obiectiv ai.
                Îți recomandăm structura potrivită și îți facem o estimare clară.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Cere ofertă exactă</Button>
                <Button href="/servicii" variant="secondary">
                  Vezi serviciile
                </Button>
              </div>
            </div>
          </Panel>
        </Container>
      </section>
    </main>
  );
}