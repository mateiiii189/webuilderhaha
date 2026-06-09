import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Website cu sistem de programări",
  description:
    "Creăm website-uri cu programări pentru saloane, clinici, consultanți și afaceri care vor rezervări online, notificări și lead-uri mai clare.",
};

const industries = [
  "saloane de beauty",
  "barbershop-uri",
  "clinici și cabinete",
  "consultanți",
  "traineri și coachi",
  "service-uri auto",
];

const features = [
  {
    title: "Formular de programare",
    description:
      "Clientul trimite rapid nume, telefon, serviciu dorit, zi preferată și mesaj.",
  },
  {
    title: "WhatsApp / email",
    description:
      "Programările pot ajunge direct pe email sau WhatsApp, ca să răspunzi rapid.",
  },
  {
    title: "Calendar opțional",
    description:
      "Pentru proiecte mai complexe, se poate integra un calendar sau un sistem custom.",
  },
  {
    title: "Structură SEO",
    description:
      "Pagina de programări este legată logic de serviciile principale ale firmei.",
  },
];

const simpleVsCustom = [
  {
    title: "Programare simplă",
    description:
      "Un formular care trimite cererea către firmă. Este potrivit pentru început și are cost mai mic.",
  },
  {
    title: "Sistem custom",
    description:
      "Calendar cu sloturi, confirmări, notificări și logică specială. Potrivit pentru proiecte mai avansate.",
  },
];

const faqs = [
  {
    question: "Am nevoie de sistem custom din prima?",
    answer:
      "Nu mereu. Pentru multe firme, un formular bine făcut + WhatsApp/email este suficient la început.",
  },
  {
    question: "Pot primi programările pe WhatsApp?",
    answer:
      "Da. Putem pune buton WhatsApp și putem construi un flow simplu prin care clientul trimite cererea direct.",
  },
  {
    question: "Se poate integra cu Google Calendar?",
    answer:
      "Da, dar asta intră într-o zonă mai avansată și depinde de tipul de programări și automatizări dorite.",
  },
  {
    question: "Este bun pentru SEO?",
    answer:
      "Da, dacă pagina este legată de serviciile importante și are conținut clar pentru utilizatori și motoarele de căutare.",
  },
];

export default function WebsiteCuProgramariPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-0 top-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Website cu programări
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Website-uri cu programări pentru firme care vor lead-uri mai clare.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Construim website-uri cu formulare, WhatsApp, email și opțiuni de
              programare pentru saloane, clinici, consultanți și afaceri bazate
              pe rezervări.
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
            eyebrow="Pentru cine"
            title="Potrivit pentru afaceri care lucrează pe programări"
            description="Dacă un client trebuie să aleagă un serviciu, o zi, o oră sau să trimită o cerere înainte să cumpere, ai nevoie de un flow clar de programare."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((item) => (
              <Card key={item} className="p-5">
                <p className="text-sm font-medium capitalize text-gray-300">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="Funcționalități"
            title="Ce poate include un website cu programări"
            description="Începem simplu și adăugăm complexitate doar dacă proiectul chiar are nevoie."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <h2 className="text-xl font-semibold text-white">
                  {feature.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="Simplu sau custom"
            title="Nu orice firmă are nevoie de platformă complicată"
            description="Pentru multe afaceri, cel mai bun început este un formular clar, nu un sistem scump și greu de administrat."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {simpleVsCustom.map((item) => (
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
            <Button href="/contact">Alege structura potrivită</Button>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="SEO"
                title="Programările trebuie legate de serviciile principale"
                description="O pagină de programări ajută conversia, dar SEO-ul real vine și din pagini clare pentru serviciile pe care le oferă firma."
              />

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/website-de-prezentare">
                  Vezi website de prezentare
                </Button>
                <Button href="/landing-page" variant="secondary">
                  Vezi landing page
                </Button>
              </div>
            </div>

            <Card>
              <p className="text-sm leading-7 text-gray-400">
                Exemplu pentru o clinică:
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-300">
                <p>/</p>
                <p>/servicii</p>
                <p>/implant-dentar</p>
                <p>/albire-dentara</p>
                <p>/programare</p>
                <p>/contact</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Întrebări despre website-urile cu programări"
            description="Cele mai comune întrebări despre formulare, WhatsApp, calendar și sisteme custom."
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
                Vrei ca website-ul tău să primească programări?
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Spune-ne ce tip de programări ai nevoie și îți recomandăm
                varianta simplă sau custom, în funcție de buget și obiectiv.
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