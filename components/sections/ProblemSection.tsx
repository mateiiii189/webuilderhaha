import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";

const problems = [
  "Site vechi sau lipsă completă de website",
  "Design care nu inspiră încredere",
  "Pagini lente și greu de folosit pe telefon",
  "Structură slabă pentru SEO",
  "Fără formular, WhatsApp sau CTA clar",
];

export function ProblemSection() {
  return (
    <section className="bg-[#0B0F14] py-24">
      <Container>
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
            Problema
          </p>

          <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
            Un website slab poate pierde clienți înainte să te contacteze.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
            Mulți oameni decid dacă au încredere într-o firmă în primele
            secunde. De aceea, website-ul trebuie să fie rapid, clar și
            construit cu obiectiv comercial.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {problems.map((problem) => (
            <Card key={problem} className="p-5">
              <p className="text-sm leading-6 text-gray-300">{problem}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}