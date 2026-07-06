import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description:
    "Termeni și condiții pentru utilizarea website-ului Webuilder.ro.",
};

export default function TermeniSiConditiiPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Termeni și condiții"
      description="Informații generale privind utilizarea website-ului Webuilder.ro și serviciile prezentate."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">1. Informații generale</h2>
        <p className="leading-8">
          Website-ul Webuilder.ro este administrat de S.C. CLEARMILE LOGISTICS SRL, persoană
          juridică română, cu sediul social în Aleea Mostiștea, Nr. 39A, București, Sector 3, înregistrată la Registrul
          Comerțului cu nr. J2026039843001, CUI RO54942376.
        </p>
        <p className="leading-8">
          Prin accesarea și utilizarea acestui website, utilizatorul acceptă
          prezentele termeni și condiții.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">2. Serviciile prezentate</h2>
        <p className="leading-8">
          Website-ul prezintă servicii de creare website, landing page, redesign
          website, website cu programări și servicii conexe de optimizare tehnică.
        </p>
        <p className="leading-8">
          Informațiile prezentate au caracter general și nu reprezintă o ofertă
          contractuală fermă. Oferta finală se stabilește individual, în funcție
          de cerințele proiectului.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">3. Prețuri și oferte</h2>
        <p className="leading-8">
          Prețurile afișate pe website sunt orientative și pot varia în funcție
          de complexitatea proiectului, numărul de pagini, funcționalități,
          conținut și servicii externe necesare.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">4. Drepturi de proprietate intelectuală</h2>
        <p className="leading-8">
          Conținutul website-ului, incluzând texte, structură, elemente grafice
          și design, aparține Webuilder.ro sau partenerilor săi și nu poate fi
          copiat sau folosit fără acord scris.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">5. Limitarea răspunderii</h2>
        <p className="leading-8">
          Webuilder.ro depune eforturi pentru ca informațiile publicate să fie
          corecte și actualizate, însă nu garantează lipsa erorilor sau
          disponibilitatea permanentă a website-ului.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">6. Contact</h2>
        <p className="leading-8">
          Pentru întrebări privind acești termeni, ne puteți contacta la
          contact@webuilder.ro.
        </p>
      </section>
    </LegalPage>
  );
}