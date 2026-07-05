import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-ink pt-24 text-center px-4">
      <h1 className="font-bebas text-accent text-5xl md:text-7xl tracking-widest uppercase mb-8">
        Contact Us
      </h1>
      <p className="text-bone/70 max-w-lg mx-auto mb-12">
        We're currently building out this page, but we'd love to hear from you.
      </p>

      {/* LinkedIn Link as requested by design brief */}
      <Link
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 text-accent hover:text-white transition-colors duration-300"
      >
        <span className="font-bebas text-2xl tracking-widest uppercase">Connect on LinkedIn</span>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 transform group-hover:translate-x-1 transition-transform">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.16-3.66c-1.66 0-2.4 1-2.82 1.54v-1.3h-3.13v9.06h3.13v-4.5c0-1.21.23-2.39 1.74-2.39 1.49 0 1.5 1.4 1.5 2.47v4.42h3.14M6.9 8.24a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6m1.56 10.26V9.44H5.34v9.06h3.12z" />
        </svg>
      </Link>
      {/* Signature */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 pointer-events-auto opacity-30 hover:opacity-100 transition-opacity">
        <p className="font-sans text-[8px] md:text-[10px] text-bone tracking-widest uppercase">
          made by-techieadi4703🧿
        </p>
      </div>
    </div>
  );
}