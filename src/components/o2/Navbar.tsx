import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { O2 } from "@/lib/o2";
import { Menu, X } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "works", label: "Works" },
  { id: "results", label: "Results" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-5 md:h-20 md:px-8">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="font-display text-xs uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-crimson"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href={O2.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-crimson px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-blood"
            >
              Get Started
            </a>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-background animate-fade-in">
          <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-5">
            <Logo />
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-7 w-7 text-foreground" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-start justify-center gap-5 px-5 py-8 sm:gap-7 sm:px-8">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="max-w-full break-words text-left font-display text-4xl font-extrabold uppercase tracking-normal text-foreground hover:text-crimson sm:text-5xl"
              >
                {l.label}
              </button>
            ))}
            <a
              href={O2.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex max-w-full items-center gap-2 bg-crimson px-5 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground sm:mt-6 sm:px-6 sm:tracking-[0.18em]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </>
  );
}
