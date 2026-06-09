import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Website de prezentare pentru firme",
  description:
    "Creăm website-uri de prezentare rapide, moderne și optimizate SEO pentru firme care vor o imagine profesională și mai multe cereri de ofertă.",
};

const included = [
  "Structură SEO pentru paginile principale",
  "Design responsive pentru mobil, tabletă și desktop",
  "Homepage + pagini de servicii",
  "Formular de contact și buton WhatsApp",
  "Pagini legale: termeni, confidențialitate, cookies, ANPC",
  "Sitemap, robots și setări SEO de bază",
];

const suitableFor = [
  "firme de servicii",
  "clinici și cabinete",
  "saloane și barbershop-uri",
  "firme de transport",
  "agenții imobiliare",
  "consultanți și freelanceri",
];

const process = [
  {
    step: "01",
    title: "Înțelegem afacerea",
    description:
      "Stabilim ce servicii vinzi, cui te adresezi și ce acțiune vrei să facă vizitatorul.",
  },
  {
    step: "02",
    title: "Construim structura",
    description:
      "Alegem paginile, URL-urile, titlurile, secțiunile și CTA-urile potrivite.",
  },
  {
    step: "03",
    title: "Design & dezvoltare",
    description:
      "Implementăm website-ul într-un stil modern, rapid și potrivit brandului.",
  },
  {
    step: "04",
    title: "Testare & lansare",
    description:
      "Verificăm mobile, viteză, linkuri, formular, SEO tehnic și publicăm site-ul.",
  },
];

const faqs = [
  {
    question: "Cât durează un website de prezentare?",
    answer:
      "În general, un website de prezentare simplu poate fi gata în 7–14 zile, dacă textele, serviciile și direcția vizuală sunt clare.",
  },
  {
    question: "Website-ul va fi optimizat SEO?",
    answer:
      "Da. Construim website-ul cu URL-uri clare, title/meta, H1/H2, sitemap, robots și structură internă logică.",
  },
  {
    question: "Pot avea mai multe pagini de servicii?",
    answer:
      "Da. Pentru SEO este chiar recomandat ca serviciile importante să aibă pagini separate, nu doar o secțiune pe homepage.",
  },
  {
    question: "Primesc și paginile legale?",
    answer:
      "Da. Putem include pagini pentru termeni și condiții, politica de confidențialitate, cookies și ANPC, adaptate la tipul site-ului.",
  },
];

export default function WebsiteDePrezentarePage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-0 top-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Website de prezentare
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Website de prezentare pentru firme care vor mai mulți clienți.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Construim website-uri de prezentare rapide, moderne și optimizate
              SEO, gândite să inspire încredere și să transforme vizitatorii în
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
            eyebrow="Ce este"
            title="Un website de prezentare este fundația online a firmei tale"
            description="Nu este doar o pagină cu informații. Este locul unde un potențial client înțelege cine ești, ce oferi, de ce să aibă încredere și cum te poate contacta."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <h2 className="text-xl font-semibold text-white">
                Imagine profesională
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Un site bine construit face firma să pară mai serioasă, mai
                clară și mai ușor de contactat.
              </p>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-white">
                Structură pentru SEO
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Paginile sunt gândite logic, cu URL-uri, titluri și conținut
                potrivit pentru căutările relevante.
              </p>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-white">
                Focus pe lead-uri
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Website-ul trebuie să trimită vizitatorul spre acțiune:
                formular, WhatsApp, telefon sau cerere de ofertă.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="Include"
            title="Ce include un website de prezentare"
            description="Construim site-ul ca o structură completă, nu ca un simplu template schimbat rapid."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {included.map((item) => (
              <Card key={item} className="p-5">
                <p className="text-sm leading-7 text-gray-300">✓ {item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="Pentru cine"
            title="Pentru ce tipuri de afaceri este potrivit"
            description="Un website de prezentare este ideal pentru firme care vând servicii, au nevoie de încredere și vor să fie găsite online."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suitableFor.map((item) => (
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
            eyebrow="Proces"
            title="Cum construim website-ul"
            description="Fiecare proiect începe cu structură și obiectiv, nu direct cu design random."
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
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="SEO"
                title="Fiecare serviciu important poate avea pagina lui"
                description="Pentru SEO, nu este suficient să ai toate serviciile puse pe homepage. Dacă un serviciu este căutat pe Google și poate aduce clienți, merită o pagină separată."
              />

              <div className="mt-8">
                <Button href="/servicii">Vezi toate serviciile</Button>
              </div>
            </div>

            <Card>
              <p className="text-sm leading-7 text-gray-400">
                Exemplu structură corectă pentru o firmă:
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-300">
                <p>/</p>
                <p>/servicii</p>
                <p>/servicii/serviciu-principal</p>
                <p>/despre-noi</p>
                <p>/portofoliu</p>
                <p>/contact</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0F14] py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Întrebări despre website-urile de prezentare"
            description="Cele mai comune întrebări înainte de începerea unui proiect."
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
            Vrei un website de prezentare construit corect?
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
            Spune-ne ce firmă ai, ce servicii vinzi și îți recomandăm o structură
            potrivită pentru obiectivele tale.
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