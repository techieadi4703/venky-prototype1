import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Anton, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400"], // Approximating the Middle weight
});

// Ultra-heavy condensed — the "GET YOUR IMAGINATION" printer sheet
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healing Tool",
  description: "Get your imagination. 30 Years Experts — Flawless retouch to print.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${oswald.variable} ${anton.variable} ${bricolage.variable} antialiased selection:bg-accent selection:text-ink`}>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
