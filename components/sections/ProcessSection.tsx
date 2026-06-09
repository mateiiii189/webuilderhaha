import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Brief & obiectiv",
    description: "Înțelegem firma, serviciile, publicul țintă și scopul website-ului.",
  },
  {
    number: "02",
    title: "Structură SEO",
    description: "Stabilim paginile, URL-urile, titlurile, H1-urile și CTA-urile.",
  },
  {
    number: "03",
    title: "Design & conținut",
    description: "Construim o direcție vizuală clară, modernă și potrivită brandului.",
  },
  {
    number: "04",
    title: "Dezvoltare",
    description: "Implementăm website-ul cu tehnologii moderne, rapid și responsive.",
  },
  {
    number: "05",
    title: "Testare",
    description: "Verificăm mobile, viteză, linkuri, formulare, SEO și erori tehnice.",
  },
  {
    number: "06",
    title: "Lansare",
    description: "Publicăm site-ul, conectăm domeniul, SSL-ul și Google Search Console.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-[#0B0F14] py-24">
      <Container>
        <SectionHeading
          eyebrow="Proces"
          title="De la fundație la lansare"
          description="Nu începem direct cu designul. Întâi construim fundația: obiectiv, structură SEO și traseu clar spre conversie."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.number}>
              <p className="text-sm font-semibold text-amber-300">
                {step.number}
              </p>

              <h3 className="mt-4 text-xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}