import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Politica cookies",
  description:
    "Politica privind cookie-urile utilizate pe website-ul Webuilder.ro.",
};

export default function PoliticaCookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Politica privind cookie-urile"
      description="Informații despre cookie-urile folosite pe Webuilder.ro și modul în care îți poți gestiona consimțământul."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          1. Ce sunt cookie-urile
        </h2>
        <p className="leading-8">
          Cookie-urile sunt fișiere mici stocate pe dispozitivul utilizatorului
          atunci când acesta accesează un website. Ele pot ajuta la funcționarea
          site-ului, analiză, măsurarea performanței și marketing.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          2. Categorii de cookie-uri folosite
        </h2>
        <p className="leading-8">
          Webuilder.ro poate folosi următoarele categorii de cookie-uri:
        </p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong className="text-white">Cookie-uri necesare:</strong>{" "}
            necesare pentru funcționarea site-ului, securitate, memorarea
            preferințelor privind consimțământul și funcții de bază.
          </li>
          <li>
            <strong className="text-white">Cookie-uri de analiză:</strong>{" "}
            folosite pentru măsurarea traficului și înțelegerea modului în care
            utilizatorii interacționează cu site-ul, de exemplu prin Google
            Analytics 4.
          </li>
          <li>
            <strong className="text-white">Cookie-uri de marketing:</strong>{" "}
            folosite pentru măsurarea campaniilor, conversii, remarketing și
            servicii precum Google Ads.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          3. Google Analytics, Google Tag Manager și Google Ads
        </h2>
        <p className="leading-8">
          Website-ul poate folosi Google Tag Manager pentru administrarea
          scripturilor, Google Analytics 4 pentru analiză de trafic și Google Ads
          pentru măsurarea conversiilor sau campanii de marketing.
        </p>
        <p className="leading-8">
          Aceste servicii sunt activate doar în funcție de consimțământul acordat
          prin bannerul de cookies. Pentru utilizatorii care nu acceptă cookie-uri
          de analiză sau marketing, aceste categorii rămân dezactivate.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          4. Google Consent Mode
        </h2>
        <p className="leading-8">
          Website-ul folosește Google Consent Mode pentru a transmite către
          serviciile Google starea consimțământului utilizatorului. Implicit,
          consimțământul pentru analiză și marketing este setat ca refuzat, iar
          acesta se modifică doar după alegerea utilizatorului.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          5. Gestionarea consimțământului
        </h2>
        <p className="leading-8">
          Utilizatorul poate accepta toate cookie-urile, poate refuza cookie-urile
          opționale sau poate alege separat cookie-urile de analiză și marketing.
          Preferințele pot fi modificate ulterior prin butonul „Cookies” afișat
          pe website.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          6. Modificarea setărilor din browser
        </h2>
        <p className="leading-8">
          Utilizatorii pot bloca sau șterge cookie-urile și din setările
          browserului. Dezactivarea anumitor cookie-uri poate afecta funcționarea
          unor servicii sau măsurarea corectă a performanței site-ului.
        </p>
      </section>
    </LegalPage>
  );
}