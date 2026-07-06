import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Politica de confidențialitate și GDPR",
  description:
    "Politica de confidențialitate și GDPR Webuilder.ro privind prelucrarea datelor personale.",
};

export default function PoliticaDeConfidentialitatePage() {
  return (
    <LegalPage
    eyebrow="GDPR"
    title="Politica de confidențialitate și GDPR"
    description="Informații despre modul în care Webuilder.ro colectează, utilizează și protejează datele personale."
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">1. Operatorul de date</h2>
        <p className="leading-8">
          Operatorul datelor personale este S.C. CLEARMILE LOGISTICS SRL, cu sediul în Aleea Mostiștea, Nr. 39A, București, Sector 3,
          CUI RO54942376, e-mail contact@webuilder.ro.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
            Prelucrarea datelor prin servicii Google
        </h2>
        <p className="leading-8">
            Website-ul poate folosi servicii precum Google Tag Manager, Google Analytics
            4 și Google Ads, în funcție de consimțământul acordat de utilizator prin
            bannerul de cookies. Aceste servicii pot colecta date tehnice despre
            interacțiunea cu website-ul, cum ar fi paginile vizitate, evenimentele de
            conversie, tipul dispozitivului și informații similare.
        </p>
        <p className="leading-8">
            Consimțământul pentru analiză și marketing poate fi acordat, refuzat sau
            modificat oricând prin setările de cookies disponibile pe website.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">2. Date colectate</h2>
        <p className="leading-8">
          Prin intermediul website-ului putem colecta date precum nume, prenume,
          adresă de e-mail, număr de telefon, numele firmei și mesajele transmise
          prin formularul de contact.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">3. Scopul prelucrării</h2>
        <p className="leading-8">
          Datele sunt folosite pentru a răspunde solicitărilor, pentru a transmite
          oferte, pentru comunicare comercială solicitată de utilizator și pentru
          îmbunătățirea serviciilor oferite.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">4. Temeiul legal</h2>
        <p className="leading-8">
          Prelucrarea datelor se poate baza pe consimțământ, interes legitim,
          executarea unui contract sau obligații legale, în funcție de situație.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">5. Durata stocării</h2>
        <p className="leading-8">
          Datele sunt păstrate doar atât timp cât este necesar pentru scopurile
          pentru care au fost colectate sau conform obligațiilor legale aplicabile.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">6. Drepturile utilizatorilor</h2>
        <p className="leading-8">
          Utilizatorii au dreptul de acces, rectificare, ștergere, restricționare,
          opoziție și portabilitate, conform legislației aplicabile privind
          protecția datelor.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">7. Contact</h2>
        <p className="leading-8">
          Pentru întrebări privind datele personale, ne puteți contacta la
          contact@webuilder.ro.
        </p>
      </section>
    </LegalPage>
  );
}