import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
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
    "Solicită o ofertă sau programează o întâlnire online prin Google Meet ori o întâlnire fizică cu Webuilder.ro.",
};

const physicalBookingUrl =
  process.env.NEXT_PUBLIC_GOOGLE_BOOKING_PHYSICAL_URL || "#";

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
              Programează o întâlnire online prin Google Meet, o discuție
              fizică sau trimite-ne direct detaliile proiectului.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <SmoothScrollLink
                targetId="programare"
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
              Alege cum vrei să discutăm
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
              Alegi tipul întâlnirii, ziua și ora disponibile direct din
              calendar.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card className="group relative flex h-full flex-col overflow-hidden border-amber-400/35 bg-amber-400/[0.055] transition duration-500 hover:-translate-y-1 hover:border-amber-400/60 hover:bg-amber-400/[0.08]">
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/35 bg-amber-400/10 text-amber-300">
                    <Video className="h-7 w-7" strokeWidth={2} />
                  </div>

                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300">
                    Recomandat
                  </span>
                </div>

                <h3 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-white">
                  Întâlnire pe Google Meet
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300">
                  Discutăm despre firmă, obiective, structură, funcționalități
                  și pașii necesari pentru dezvoltarea proiectului tău online.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
                    <Clock3 className="h-4 w-4 text-amber-300" />
                    30 minute
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
                    <Video className="h-4 w-4 text-amber-300" />
                    Google Meet
                  </span>
                </div>

                <ul className="mt-7 space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                    Alegi ziua și ora disponibile
                  </li>

                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                    Linkul Google Meet este creat automat
                  </li>

                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                    Primești detaliile pe email
                  </li>
                </ul>
              </div>

              <div className="relative mt-auto pt-8">
                <Link
                  href="/programare"
                  className="group/button inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Programează online

                  <ArrowUpRight
                    className="h-4 w-4 transition duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                    strokeWidth={2.2}
                  />
                </Link>
              </div>
            </Card>

            <Card className="group flex h-full flex-col transition duration-500 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-white/[0.05]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-300 transition duration-500 group-hover:border-amber-400/35 group-hover:bg-amber-400/10">
                <MapPin className="h-7 w-7" strokeWidth={2} />
              </div>

              <h3 className="mt-7 text-3xl font-bold leading-tight tracking-tight text-white">
                Întâlnire fizică
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-300">
                Discutăm în persoană despre proiect, obiective, structură,
                funcționalități și toate detaliile care necesită o analiză mai
                aprofundată.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
                  <Clock3 className="h-4 w-4 text-amber-300" />
                  45 minute
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300">
                  <MapPin className="h-4 w-4 text-amber-300" />
                  București
                </span>
              </div>

              <ul className="mt-7 space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                  Alegi intervalul disponibil
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                  Locația se confirmă după programare
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-400" />
                  Primești confirmarea pe email
                </li>
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href={physicalBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/button inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 text-sm font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Programează întâlnirea

                  <ArrowUpRight
                    className="h-4 w-4 transition duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                    strokeWidth={2.2}
                  />
                </a>
              </div>
            </Card>
          </div>
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