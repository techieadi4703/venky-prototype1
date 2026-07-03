import type { Metadata } from "next";
import { Bebas_Neue, Oswald } from "next/font/google";
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
      <body className={`${bebasNeue.variable} ${oswald.variable} antialiased selection:bg-accent selection:text-ink`}>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
