import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site";
import { GoogleConsent } from "@/components/cookies/GoogleConsent";
import { CookieBanner } from "@/components/cookies/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Webuilder.ro | Creare website-uri pentru firme moderne",
    template: "%s | Webuilder.ro",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.domain),
  openGraph: {
    title: "Webuilder.ro | Creare website-uri pentru firme moderne",
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: "Webuilder.ro",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>
        <GoogleConsent />
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}