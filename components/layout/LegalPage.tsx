import { Container } from "@/components/layout/Container";
import { Panel } from "@/components/ui/Panel";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function LegalPage({
  eyebrow,
  title,
  description,
  children,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              {eyebrow}
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
              {description}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <Panel>
            <div className="max-w-4xl space-y-10 text-[15px] leading-8 text-gray-400 md:text-base">
              {children}
            </div>
          </Panel>
        </Container>
      </section>
    </main>
  );
}