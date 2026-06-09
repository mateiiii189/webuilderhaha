import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Landing Page",
    price: "de la 300€",
    description: "Pentru o ofertă, campanie sau serviciu specific.",
    features: ["1 pagină", "Design responsive", "CTA clar", "SEO tehnic de bază"],
  },
  {
    name: "Website Business",
    price: "de la 700€",
    description: "Pentru firme care vor o prezență online completă.",
    features: ["4–6 pagini", "Structură SEO", "Formular contact", "Pagini legale"],
    highlighted: true,
  },
  {
    name: "Website + Programări",
    price: "de la 1.200€",
    description: "Pentru afaceri care au nevoie de rezervări sau lead-uri.",
    features: ["Website complet", "Formular/programări", "Email/WhatsApp", "SEO tehnic"],
  },
];

export function PricingSection() {
  return (
    <section className="bg-[#080B10] py-24">
      <Container>
        <SectionHeading
          eyebrow="Prețuri"
          title="Pachete orientative pentru website-uri"
          description="Prețul final depinde de numărul de pagini, funcționalități și conținut. Folosim prețuri de pornire ca să fie clar de la început."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? "border-amber-400/40 bg-amber-400/[0.06]"
                  : ""
              }
            >
              {plan.highlighted ? <Badge>Recomandat</Badge> : null}

              <h3 className="mt-5 text-xl font-semibold text-white">
                {plan.name}
              </h3>

              <p className="mt-4 text-3xl font-semibold text-white">
                {plan.price}
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm text-gray-300">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/preturi">Vezi toate prețurile</Button>
        </div>
      </Container>
    </section>
  );
}