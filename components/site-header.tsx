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
      <div className="relative w-full max-w-[1440px] mx-auto h-24 flex items-center">
        
        {/* Logo (Right-aligned against the 16% line) */}
        <div className="absolute top-0 left-0 h-full flex items-center justify-end pr-4 md:pr-8" style={{ width: '16%' }}>
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
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
          
          {/* Column 2 (52%): HOME and ABOUT US */}
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-16 md:gap-24 pointer-events-auto" style={{ left: 'calc(52% + 16px)' }}>
            <Link
              href="/"
              className={`font-bebas text-[15px] md:text-[17px] tracking-[0.1em] transition-colors duration-200 ease-out ${
                pathname === "/" ? "text-accent" : "text-rose hover:text-accent"
              }`}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className={`font-bebas text-[15px] md:text-[17px] tracking-[0.1em] transition-colors duration-200 ease-out ${
                pathname === "/about" ? "text-accent" : "text-rose hover:text-accent"
              }`}
            >
              ABOUT US
            </Link>
          </div>

          {/* Column 3 (74%): OUR WORK and CONTACT US */}
          <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-16 md:gap-24 pointer-events-auto" style={{ left: 'calc(74% + 16px)' }}>
            <Link
              href="/work"
              className={`font-bebas text-[15px] md:text-[17px] tracking-[0.1em] transition-colors duration-200 ease-out ${
                pathname === "/work" ? "text-accent" : "text-rose hover:text-accent"
              }`}
            >
              OUR WORK
            </Link>
            <Link
              href="/contact"
              className={`font-bebas text-[15px] md:text-[17px] tracking-[0.1em] transition-colors duration-200 ease-out ${
                pathname === "/contact" ? "text-accent" : "text-rose hover:text-accent"
              }`}
            >
              CONTACT US
            </Link>
          </div>
        </nav>

        {/* Mobile Hamburger (Right aligned) */}
        <div className="md:hidden absolute top-0 right-0 h-full flex items-center pr-4">
          <button
            className="text-rose focus-visible:outline-2 focus-visible:outline-accent p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={mobileMenuOpen ? "M18 6L6 18M6 6l12 12" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
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
