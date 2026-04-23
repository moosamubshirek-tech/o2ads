import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { O2 } from "@/lib/o2";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  const settings = useSiteSettings();

  return (
    <footer className="border-t border-crimson/40 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-8">
        <div>
          <Logo className="text-3xl" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {O2.tagline}
          </p>
        </div>

        <div>
          <h4 className="font-display text-xs uppercase tracking-[0.25em] text-crimson">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 font-display uppercase tracking-wider text-foreground/80">
            <li><a href="#about" className="hover:text-crimson">About</a></li>
            <li><a href="#services" className="hover:text-crimson">Services</a></li>
            <li><a href="#works" className="hover:text-crimson">Works</a></li>
            <li><a href="#results" className="hover:text-crimson">Results</a></li>
            <li><a href="#contact" className="hover:text-crimson">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xs uppercase tracking-[0.25em] text-crimson">
            Connect
          </h4>
          <div className="mt-4 flex gap-4">
            <a href={settings.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"
              className="grid h-11 w-11 place-items-center border border-border hover:border-crimson hover:text-crimson">
              <Instagram className="h-5 w-5" />
            </a>
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"
                className="grid h-11 w-11 place-items-center border border-border hover:border-crimson hover:text-crimson">
                <Facebook className="h-5 w-5" />
              </a>
            )}
            <a href={settings.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center border border-border hover:border-crimson hover:text-crimson">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href={`mailto:${settings.email}`} aria-label="Email"
              className="grid h-11 w-11 place-items-center border border-border hover:border-crimson hover:text-crimson">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{settings.email}</p>
          <p className="text-sm text-muted-foreground">{settings.phoneDisplay}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:flex-row md:px-8">
          <span>© 2026 O2 Ads. All rights reserved.</span>
          <Link to="/privacy-policy" className="hover:text-crimson">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
