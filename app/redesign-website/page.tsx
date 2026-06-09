import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Redesign website pentru firme",
  description:
    "Refacem website-uri vechi în site-uri moderne, rapide, responsive și optimizate SEO pentru firme care vor o prezență online mai profesionistă.",
};

const signs = [
  "site-ul arată vechi sau neprofesionist",
  "nu se vede bine pe telefon",
  "se încarcă greu",
  "nu ai cereri de ofertă prin site",
  "structura SEO este slabă",
  "textele și paginile nu mai reflectă firma actuală",
];

const improvements = [
  {
    title: "Design modern",
    description:
      "Refacem aspectul vizual ca firma să pară mai serioasă, clară și actuală.",
  },
  {
    title: "Mobile-first",
    description:
      "Construim experiența pentru telefon din start, nu ca adaptare făcută la final.",
  },
  {
    title: "Structură SEO",
    description:
      "Reorganizăm paginile, URL-urile, titlurile și secțiunile importante.",
  },
  {
    title: "Conversii mai clare",
    description:
      "Adăugăm CTA-uri, formulare, WhatsApp și trasee mai simple spre contact.",
  },
];

const process = [
  {
    step: "01",
    title: "Audit rapid",
    description:
      "Analizăm site-ul actual: design, viteză, mobile, structură, SEO și claritate.",
  },
  {
    step: "02",
    title: "Nouă structură",
    description:
      "Stabilim ce pagini păstrăm, ce rescriem, ce adăugăm și ce eliminăm.",
  },
  {
    step: "03",
    title: "Redesign",
    description:
      "Construim un aspect modern, coerent și potrivit pentru obiectivele firmei.",
  },
  {
    step: "04",
    title: "Lansare",
    description:
      "Publicăm noul site, verificăm linkurile, SEO-ul, formularul și indexarea.",
  },
];

const faqs = [
  {
    question: "Păstrăm domeniul vechi?",
    answer:
      "Da. În mod normal păstrăm domeniul existent și înlocuim doar website-ul vechi cu noua versiune.",
  },
  {
    question: "Pierd SEO-ul existent?",
    answer:
      "Dacă există pagini indexate, trebuie gestionate atent URL-urile și redirecturile. Scopul este să păstrăm ce e valoros și să îmbunătățim structura.",
  },
  {
    question: "Pot păstra textele vechi?",
    answer:
      "Da, dar de obicei recomandăm rescrierea textelor importante pentru claritate, conversie și SEO.",
  },
  {
    question: "Cât durează un redesign?",
    answer:
      "Depinde de mărimea site-ului. Un redesign simplu poate dura 7–14 zile, iar unul mai complex poate dura mai mult.",
  },
];

export default function RedesignWebsitePage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Redesign website
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Transformăm website-ul vechi într-un site modern și rapid.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Refacem site-uri vechi în website-uri clare, responsive și
              optimizate SEO, ca firma ta să inspire mai multă încredere și să
              primească mai multe cereri de ofertă.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact">Cere audit rapid</Button>
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
            eyebrow="Semne"
            title="Când ai nevoie de redesign website"
            description="Dacă site-ul actual nu mai inspiră încredere, nu funcționează bine pe mobil sau nu aduce cereri, probabil nu mai susține afacerea corect."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {signs.map((item) => (
              <Card key={item} className="p-5">
                <p className="text-sm font-medium text-gray-300">✓ {item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="Îmbunătățiri"
            title="Ce schimbăm într-un redesign corect"
            description="Un redesign bun nu înseamnă doar culori noi. Înseamnă structură mai clară, viteză mai bună, mobile-first și traseu mai simplu către contact."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {improvements.map((item) => (
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

      <section className="bg-[#080B10] py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="SEO"
                title="Redesign-ul trebuie făcut fără să distrugă structura existentă"
                description="Dacă site-ul vechi are pagini indexate sau trafic organic, trebuie tratate atent URL-urile, redirecturile și paginile care merită păstrate."
              />

              <div className="mt-8">
                <Button href="/contact">Verifică site-ul actual</Button>
              </div>
            </div>

            <Card>
              <p className="text-sm leading-7 text-gray-400">
                Înainte de redesign verificăm:
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-300">
                <p>✓ pagini existente</p>
                <p>✓ URL-uri importante</p>
                <p>✓ servicii principale</p>
                <p>✓ pagini care trebuie redirectate</p>
                <p>✓ title/meta/H1</p>
                <p>✓ formular și CTA-uri</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="Proces"
            title="Procesul de redesign"
            description="Refacem site-ul cu un plan clar, ca să nu pierzi timp și să nu stricăm ce poate fi valoros din structura existentă."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {process.map((item) => (
              <Card key={item.step}>
                <p className="text-sm font-semibold text-amber-300">
                  {item.step}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-white">
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

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Întrebări despre redesign website"
            description="Cele mai comune întrebări când o firmă vrea să refacă site-ul vechi."
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
                Start rebuilding
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Ai deja un website, dar nu mai arată sau nu mai vinde bine?
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Trimite-ne site-ul actual și îți spunem ce poate fi îmbunătățit:
                design, viteză, structură, SEO și conversie.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Cere audit rapid</Button>
                <Button href="/servicii" variant="secondary">
                  Vezi servicii
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