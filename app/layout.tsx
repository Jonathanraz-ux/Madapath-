import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "MadaPath — Démarches administratives à Madagascar", template: "%s | MadaPath" },
  description: "Accompagnement clair et humain pour votre visa, résidence, autorisation d’emploi et installation à Madagascar.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="fr"><body>{children}</body></html>; }
