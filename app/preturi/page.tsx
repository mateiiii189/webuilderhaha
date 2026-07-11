import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Prețuri creare website",
  description:
    "Prețuri orientative pentru creare website: landing page, website business, website premium și servicii suplimentare.",
};

const plans = [
  {
    name: "Landing Page",
    price: "de la 450€",
    description:
      "Pentru o ofertă, campanie, serviciu specific sau validarea rapidă a unei idei.",
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
    price: "de la 850€",
    description:
      "Pentru firme care vor o prezență online completă, clară și profesionistă.",
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
    name: "Website Premium",
    price: "de la 1.500€",
    description:
      "Pentru firme care vor un website mai avansat, cu structură completă, conversii, SEO și funcționalități personalizate.",
    features: [
      "Website complet custom",
      "6–10 pagini principale",
      "Strategie de conversie",
      "Blog / articole SEO",
      "Formulare avansate",
      "Tracking conversii",
      "Pagini legale standard",
    ],
  },
];

const extras = [
  {
    title: "Mentenanță lunară",
    price: "de la 75€/lună",
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
    price: "de la 12€",
    description:
      "Articol structurat pentru întrebări comerciale, trafic organic și poziționare mai bună în Google.",
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
      <section className="relative overflow-hidden pb-24 pt-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Prețuri
            </p>

            <h1 className="text-5xl font-black leading-[1] tracking-tight text-white md:text-7xl">
              Prețuri pentru website-uri construite corect.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Pachete orientative pentru landing pages, website-uri business și
              website-uri premium. Prețul final depinde de structură, număr de
              pagini și funcționalități.
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
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Pachete
            </p>

            <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
              Alege punctul de pornire potrivit
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
              Nu vindem template-uri la kilogram. Fiecare pachet pornește de la
              o structură clară, adaptată obiectivului firmei.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`flex h-full flex-col transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.05] ${
                  plan.highlighted
                    ? "border-amber-400/40 bg-amber-400/[0.06]"
                    : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-4">
                  <h2 className="text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-white">
                    {plan.name}
                  </h2>

                  {plan.highlighted ? <Badge>Recomandat</Badge> : null}
                </div>

                <p className="mt-4 text-4xl font-bold tracking-tight text-white">
                  {plan.price}
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className="text-amber-400">✓</span>
                      <span>{feature}</span>
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
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Extra
            </p>

            <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
              Servicii suplimentare
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
              Poți adăuga pagini, mentenanță sau conținut SEO în funcție de
              nevoile proiectului.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {extras.map((extra) => (
              <Card
                key={extra.title}
                className="transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.05]"
              >
                <h2 className="text-2xl font-bold leading-tight tracking-[-0.025em] text-white">
                  {extra.title}
                </h2>

                <p className="mt-3 text-2xl font-bold text-amber-300">
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
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                Costuri externe
              </p>

              <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
                Ce nu este inclus în prețul website-ului
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
                Ca să fie totul transparent, separăm costul de dezvoltare de
                costurile externe precum domeniu, hosting, email sau servicii
                terțe.
              </p>

              <div className="mt-8">
                <Button href="/contact">Discută proiectul</Button>
              </div>
            </div>

            <Card>
              <div className="space-y-4 text-sm text-gray-300">
                {[
                  "Domeniu .ro / .com",
                  "Găzduire / Vercel Pro, dacă este cazul",
                  "Email business",
                  "Servicii externe: analytics, formulare, automatizări",
                  "Texte profesionale avansate, dacă sunt cerute separat",
                ].map((item) => (
                  <p key={item} className="flex items-start gap-2">
                    <span className="text-amber-400">✓</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              FAQ
            </p>

            <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
              Întrebări despre prețuri
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
              Cele mai comune întrebări despre costuri, durată, facturare și ce
              este inclus.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <Card
                key={faq.question}
                className="transition duration-500 hover:-translate-y-1 hover:border-amber-400/30 hover:bg-white/[0.05]"
              >
                <h2 className="text-xl font-bold leading-tight text-white">
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

              <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
                Nu știi ce pachet se potrivește?
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Spune-ne ce tip de firmă ai, ce servicii vinzi și ce obiectiv
                ai. Îți recomandăm structura potrivită și îți facem o estimare
                clară.
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