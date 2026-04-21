import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Logo = { name: string; logo_url: string };

const FALLBACK: Logo[] = [
  { name: "Lumen", logo_url: "" },
  { name: "Saffron", logo_url: "" },
  { name: "Northwind", logo_url: "" },
  { name: "Velura", logo_url: "" },
  { name: "Atlas Co.", logo_url: "" },
  { name: "Studio Nine", logo_url: "" },
];

export function ClientLogos() {
  const [items, setItems] = useState<Logo[]>(FALLBACK);
  useEffect(() => {
    supabase.from("client_logos").select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) setItems(data as Logo[]);
    });
  }, []);

  const row = (
    <div className="flex shrink-0 items-center gap-12 px-6">
      {items.map((l, i) => (
        <div
          key={`${l.name}-${i}`}
          className="grid h-16 w-40 shrink-0 place-items-center border border-border bg-surface font-display text-lg font-bold uppercase tracking-wider text-muted-foreground"
        >
          {l.logo_url ? <img src={l.logo_url} alt={l.name} loading="lazy" className="max-h-10 max-w-32 opacity-70" /> : l.name}
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Trusted By</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase leading-[0.92] md:text-5xl">
            Brands We've Worked With
          </h2>
        </div>
      </div>
      <div className="mt-12 overflow-hidden">
        <div className="flex w-max animate-marquee-slow">
          {row}{row}
        </div>
      </div>
    </section>
  );
}
