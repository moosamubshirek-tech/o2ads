import { useEffect, useRef, useState } from "react";
import marketingImg from "@/assets/marketing-strategy.jpg";

export function MarketingStrategy() {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setY(center * -0.18);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Approach</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            Marketing <span className="text-crimson">Strategy</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Our strategy is rooted in the belief that people follow people, not just logos. We
            leverage the power of personal branding to humanize your business, establishing leadership
            as a trusted voice within your industry. By synchronizing personal influence with a
            tailored organic brand strategy, we create a high-trust ecosystem that naturally attracts
            and retains a dedicated audience.
          </p>
        </div>

        <div className="reveal relative aspect-[4/5] overflow-hidden border border-border">
          <img
            src={marketingImg}
            alt="Marketing strategy editorial portrait"
            loading="lazy"
            className="h-[120%] w-full object-cover grayscale-[20%]"
            style={{ transform: `translateY(${y}px)`, willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
