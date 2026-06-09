import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Panel } from "@/components/ui/Panel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Demo firmă de logistică",
  description:
    "Demo website pentru firmă de transport, logistică și servicii B2B.",
};

const services = [
  "Transport rutier internațional",
  "Freight forwarding",
  "Transport marfă generală",
  "Soluții logistice B2B",
];

export default function LogisticsCompanyDemoPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                Demo website B2B
              </p>

              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Website pentru firmă de transport și logistică.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
                O structură clară pentru companii care vor să transmită
                seriozitate, capacitate operațională și să primească cereri de
                ofertă de la clienți B2B.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/contact">Cere un website similar</Button>
                <Button href="/portofoliu" variant="secondary">
                  Înapoi la portofoliu
                </Button>
              </div>
            </div>

            <Card>
              <div className="rounded-3xl border border-white/10 bg-[#080B10] p-6">
                <div className="mb-6 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>

                <p className="text-sm font-medium text-amber-300">
                  Logistics demo
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-white">
                  European Freight Solutions
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  Transport rutier, soluții de expediție și servicii logistice
                  pentru companii din Europa.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-400">Rute</p>
                    <p className="mt-2 font-semibold text-white">EU</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-400">Clienți</p>
                    <p className="mt-2 font-semibold text-white">B2B</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-gray-400">Oferte</p>
                    <p className="mt-2 font-semibold text-white">Rapid</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <SectionHeading
            eyebrow="Structură"
            title="Ce ar conține website-ul"
            description="Un website B2B trebuie să explice rapid ce servicii oferă firma, unde operează și cum poate fi contactată."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {services.map((service, index) => (
              <Card key={service} delay={index * 0.1}>
                <p className="text-sm font-medium text-amber-300">
                  0{index + 1}
                </p>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {service}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  Pagină sau secțiune dedicată, cu text clar, beneficii și
                  buton de cerere ofertă.
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
                Demo adaptabil
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Acest demo poate fi adaptat pentru orice firmă B2B.
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                Transport, distribuție, servicii industriale, mentenanță,
                consultanță sau orice firmă care vinde servicii către alte
                companii.
              </p>

              <div className="mt-8">
                <Button href="/contact">Cere ofertă</Button>
              </div>
            </div>
          </Panel>
        </Container>
      </section>
    </main>
  );
}