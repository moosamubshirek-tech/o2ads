import { useTextScramble } from "@/hooks/use-text-scramble";
import { MagneticLink } from "../MagneticButton";
import { O2 } from "@/lib/o2";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const line1 = useTextScramble("WE BUILD", 1300);
  const line2 = useTextScramble("BRANDS.", 1700);

  const onWorks = () => {
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-background pt-24 radial-glow-bl">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="max-w-5xl">
          <p className="mb-6 inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.3em] text-crimson">
            <span className="h-px w-10 bg-crimson" /> O2 Ads — Digital Marketing Agency
          </p>

          <h1 className="relative font-display text-[18vw] font-extrabold uppercase leading-[0.85] text-foreground sm:text-[14vw] md:text-[10rem] xl:text-[12rem]">
            <span className="block">{line1}</span>
            <span className="relative block">
              {line2}
              <span
                className="font-script absolute -right-2 top-1/2 -translate-y-1/2 text-3xl text-crimson md:-right-10 md:text-6xl"
                style={{ transform: "translateY(-50%) rotate(-8deg)" }}
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

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticLink href={O2.whatsapp} target="_blank" rel="noreferrer">
              Start a Project
            </MagneticLink>
            <button
              onClick={onWorks}
              className="inline-flex items-center gap-3 px-7 py-4 border border-foreground/40 font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-crimson hover:text-crimson"
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
