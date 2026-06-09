import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "Cât durează crearea unui website?",
    answer:
      "Un website simplu poate fi gata în 7–14 zile, în funcție de numărul de pagini, conținut și funcționalități.",
  },
  {
    question: "Website-ul va fi optimizat SEO?",
    answer:
      "Da. Construim site-ul cu URL-uri clare, title/meta, structură H1/H2, sitemap, robots și performanță bună.",
  },
  {
    question: "Pot primi factură?",
    answer:
      "Da. Serviciile pot fi facturate prin firmă. Datele finale de facturare vor fi completate în ofertă.",
  },
  {
    question: "Mă ajuți cu domeniu și găzduire?",
    answer:
      "Da. Te putem ghida cu domeniul, DNS-ul, Vercel, SSL-ul și emailul business.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-[#0B0F14] py-24">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Întrebări frecvente"
          description="Răspunsuri rapide pentru firmele care vor să înceapă un website construit corect."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <h3 className="text-lg font-semibold text-white">
                {faq.question}
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}