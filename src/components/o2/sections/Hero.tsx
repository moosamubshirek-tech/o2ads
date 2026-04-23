import { useTextScramble } from "@/hooks/use-text-scramble";
import { MagneticLink } from "../MagneticButton";
import { O2 } from "@/lib/o2";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const settings = useSiteSettings();
  const line1 = useTextScramble("WE BUILD", 1300);
  const line2 = useTextScramble("BRANDS.", 1700);

  const onWorks = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background pt-24 pb-16 radial-glow-bl md:min-h-screen md:pb-0">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl">
          <p className="mb-6 inline-flex max-w-full items-center gap-3 font-display text-[11px] uppercase tracking-[0.18em] text-crimson sm:text-xs sm:tracking-[0.3em]">
            <span className="h-px w-7 shrink-0 bg-crimson sm:w-10" /> <span>O2 Ads — Digital Marketing Agency</span>
          </p>

          <h1 className="relative font-display text-[17vw] font-extrabold uppercase leading-[0.88] tracking-normal text-foreground sm:text-[14vw] md:text-[10rem] xl:text-[12rem]">
            <span className="block">{line1}</span>
            <span className="relative block">
              {line2}
              <span
                className="font-script absolute right-0 top-full -translate-y-1/4 -rotate-[8deg] text-3xl text-crimson sm:-right-2 sm:top-1/2 sm:-translate-y-1/2 md:-right-10 md:text-6xl"
              >
                organically
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-foreground/80 md:text-xl">
            <span className="font-display uppercase tracking-wider text-crimson">
              {O2.tagline}
            </span>
          </p>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            O2 Ads is a results-driven digital marketing agency specializing in organic
            growth, authority SEO, personal branding, and bespoke content strategies.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <MagneticLink href={settings.whatsappUrl} target="_blank" rel="noreferrer">
              Start a Project
            </MagneticLink>
            <button
              onClick={onWorks}
              className="inline-flex items-center justify-center gap-3 border border-foreground/40 px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-crimson hover:text-crimson sm:tracking-[0.18em]"
            >
              Our Work <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
        Scroll
      </div>
    </section>
  );
}
