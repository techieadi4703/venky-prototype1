"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "OUR WORK", href: "/work" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-[max(6vw,24px)] md:px-[min(6vw,96px)] h-24 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex flex-col items-end focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <span className="text-logo-grey font-oswald font-bold text-4xl md:text-[2.75rem] leading-none tracking-tight">
            Healing Tool
          </span>
          <span className="text-logo-grey/80 font-oswald font-light text-sm md:text-[0.9rem] leading-none mt-1 tracking-wide">
            Get your imagination
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-bebas text-sm tracking-[0.15em] transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                  isActive ? "text-accent" : "text-rose hover:text-accent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-rose focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <path d={mobileMenuOpen ? "M18 6L6 18M6 6l12 12" : "M4 8h16M4 16h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-ink border-t border-accent/20 shadow-lg">
          <nav className="flex flex-col py-4 px-[max(6vw,24px)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-bebas text-xl py-4 border-b border-accent/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                    isActive ? "text-accent" : "text-rose hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
