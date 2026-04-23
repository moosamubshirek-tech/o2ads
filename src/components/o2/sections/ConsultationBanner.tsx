import { useSiteSettings } from "@/hooks/use-site-settings";
import { MagneticLink } from "../MagneticButton";

export function ConsultationBanner() {
  const settings = useSiteSettings();

  return (
    <section className="relative overflow-hidden">
      <div
        className="px-6 py-20 text-center md:py-28"
        style={{ background: "linear-gradient(135deg, var(--blood) 0%, var(--crimson) 100%)" }}
      >
        <div className="reveal mx-auto max-w-4xl">
          <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.92] text-white md:text-7xl">
            Ready to Build <br /> Your Brand?
          </h2>
          <p className="mt-5 text-base text-white/90 md:text-lg">
            Book a free consultation with our team. No commitment, just results.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticLink
              href={settings.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-background text-foreground hover:bg-foreground hover:text-background"
            >
              Chat on WhatsApp
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}
