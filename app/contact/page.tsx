import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  Video,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Container } from "@/components/layout/Container";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";
import { ContactProjectForm } from "@/components/sections/ContactProjectForm";
import { Card } from "@/components/ui/Card";
import { Panel } from "@/components/ui/Panel";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Webuilder.ro",
  description:
    "Solicită o ofertă sau programează o consultație online prin Google Meet cu Webuilder.ro.",
};


const offerDetails = [
  "tipul firmei și serviciile principale",
  "obiectivul proiectului",
  "dacă există deja un website sau domeniu",
  "exemple de website-uri care îți plac",
  "funcționalitățile necesare",
  "bugetul orientativ, dacă este stabilit",
];

export default function ContactPage() {
  const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <section className="relative overflow-hidden pb-24 pt-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
              Contact
            </p>

            <h1 className="text-5xl font-black leading-[1] tracking-tight text-white md:text-7xl">
              Hai să discutăm despre proiectul tău.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
              Programează o consultație online prin Google Meet sau
              trimite-ne direct detaliile proiectului.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <SmoothScrollLink
                targetId="programare"
                resetScrollOnMount
                offset={110}
                duration={1100}
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3.5 text-sm font-bold text-black transition duration-500 hover:-translate-y-0.5 hover:bg-amber-300"
              >
                Programează o întâlnire
              </SmoothScrollLink>

              <SmoothScrollLink
                targetId="formular-proiect"
                offset={90}
                duration={1100}
                className="inline-flex items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/10 px-6 py-3.5 text-sm font-bold text-amber-300 transition duration-500 hover:-translate-y-0.5 hover:border-amber-400/70 hover:bg-amber-400/[0.14] hover:text-amber-200"
              >
                Trimite detaliile proiectului
              </SmoothScrollLink>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="programare"
        className="scroll-mt-24 bg-[#080B10] py-24"
      >
        <Container>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Programare
            </p>

            <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
              Programează o consultație online
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
              Alegi ziua și ora disponibile direct din calendar, iar
              linkul Google Meet este creat automat.
            </p>
          </div>

          <Card className="group relative mt-12 overflow-hidden border-white/10 bg-[linear-gradient(135deg,#11161D_0%,#0F141B_58%,#0D1218_100%)] transition duration-500 hover:-translate-y-1 hover:border-amber-400/40">
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-amber-400/[0.08] blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="group/camera flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/35 bg-amber-400/10 text-amber-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-white/[0.05]">
                    <Video
                      className="h-7 w-7 transition duration-300"
                      strokeWidth={2}
                    />
                  </div>

                  <span className="group/consultation inline-flex h-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 px-6 text-sm font-bold text-amber-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:bg-white/[0.05] hover:text-amber-200">
                    Consultație online
                  </span>
                </div>

                <h3 className="mt-7 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  30 de minute pentru a pune proiectul pe direcția corectă
                </h3>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                  Discutăm despre firmă, obiective, structură, funcționalități
                  și pașii necesari pentru dezvoltarea proiectului. Pleci din
                  întâlnire cu o direcție clară și următorii pași stabiliți.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="group/pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/35 hover:bg-white/[0.06] hover:text-white">
                    <Clock3 className="h-4 w-4 text-amber-300 transition duration-300" />
                    30 minute
                  </span>

                  <span className="group/pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/35 hover:bg-white/[0.06] hover:text-white">
                    <Video className="h-4 w-4 text-amber-300 transition duration-300" />
                    Google Meet
                  </span>

                  <span className="group/pill inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/35 hover:bg-white/[0.06] hover:text-white">
                    <CalendarDays className="h-4 w-4 text-amber-300 transition duration-300" />
                    Luni–vineri
                  </span>
                </div>

                <div className="mt-8">
                  <Link
                    href="/programare"
                    className="group/button inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-7 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                  >
                    Vezi programul disponibil

                    <ArrowUpRight
                      className="h-4 w-4 transition duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                      strokeWidth={2.2}
                    />
                  </Link>
                </div>
              </div>

              <div className="relative border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <div className="rounded-[24px] border border-white/10 bg-[#0D1218] p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                    Cum funcționează
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        index: "01",
                        title: "Alegi intervalul",
                        description:
                          "Selectezi ziua și ora disponibile direct din calendar.",
                      },
                      {
                        index: "02",
                        title: "Verifici emailul",
                        description:
                          "Confirmi adresa prin codul unic primit pe email.",
                      },
                      {
                        index: "03",
                        title: "Primești confirmarea",
                        description:
                          "Linkul Google Meet și toate detaliile ajung automat.",
                      },
                    ].map((step) => (
                      <div
                        key={step.index}
                        className="group/step flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-amber-400/40"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-xs font-black text-amber-300 transition duration-300">
                          {step.index}
                        </span>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            {step.title}
                          </p>

                          <p className="mt-1 text-sm leading-6 text-gray-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <section id="oferta" className="scroll-mt-24 bg-[#0B0F14] py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.8fr] lg:items-start">
            <div id="formular-proiect" className="scroll-mt-28">
              <Card>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                Cerere ofertă
              </p>

              <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
                Completează detaliile proiectului
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300">
                Trimite informațiile principale, iar noi revenim cu recomandări
                și o estimare potrivită.
              </p>

              <ContactProjectForm />
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                  Contact direct
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                  Preferi să discutăm direct?
                </h2>

                <div className="mt-7 space-y-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-amber-400/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="truncate text-sm font-semibold text-gray-200">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={phoneHref}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-amber-400/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                      <Phone className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Telefon</p>
                      <p className="text-sm font-semibold text-gray-200">
                        {siteConfig.phone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-[#25D366]/35 hover:bg-[#25D366]/[0.06]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                      <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">WhatsApp</p>
                      <p className="text-sm font-semibold text-gray-200">
                        Scrie-ne direct
                      </p>
                    </div>
                  </a>
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Ce ajută pentru o ofertă rapidă
                </h2>

                <ul className="mt-6 space-y-4">
                  {offerDetails.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#080B10] py-24">
        <Container>
          <Panel>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400">
                  Următorul pas
                </p>

                <h2 className="text-4xl font-black leading-[1] tracking-tight text-white md:text-5xl">
                  Nu știi încă de ce soluție ai nevoie?
                </h2>

                <p className="mt-5 text-base leading-8 text-gray-400 md:text-lg">
                  Programează o discuție și analizăm împreună obiectivele,
                  structura și funcționalitățile proiectului.
                </p>
              </div>

              <SmoothScrollLink
                targetId="programare"
                offset={110}
                duration={1100}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-7 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
              >
                <CalendarDays className="h-4 w-4" />
                Vezi programul disponibil
              </SmoothScrollLink>
            </div>
          </Panel>
        </Container>
      </section>
    </main>
  );
}