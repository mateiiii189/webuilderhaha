import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { GoogleConsent } from "@/components/cookies/GoogleConsent";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-main",
});

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
    <html lang="ro" className={inter.variable}>
      <body>
        <GoogleConsent />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}