import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "./Container";

const services = [
  { label: "Website de prezentare", href: "/website-de-prezentare" },
  { label: "Landing page", href: "/landing-page" },
  { label: "Website cu programări", href: "/website-cu-programari" },
  { label: "Redesign website", href: "/redesign-website" },
];

const legal = [
  { label: "Termeni și condiții", href: "/termeni-si-conditii" },
  { label: "Politica de confidențialitate", href: "/politica-de-confidentialitate" },
  { label: "Politica cookies", href: "/politica-cookies" },
  { label: "ANPC", href: "/anpc" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080B10] py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-lg font-semibold text-white">
              Webuilder.ro
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              Construim website-uri rapide, moderne și optimizate SEO pentru firme
              care vor o prezență online solidă și mai multe cereri de ofertă.
            </p>

            <div className="mt-6 text-sm leading-7 text-gray-400">
              <p>S.C. CLEARMILE LOGISTICS SRL </p>
              <p>CUI: RO54942376</p>
              <p>Nr. Reg. Comerțului: J2026039843001</p>
              <p>Email: {siteConfig.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Servicii</h3>
            <ul className="mt-4 space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-3">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-500">
          © 2026 Webuilder.ro. Toate drepturile rezervate.
        </div>
      </Container>
    </footer>
  );
}