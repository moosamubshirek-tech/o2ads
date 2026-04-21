import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type CS = { client: string; challenge?: string | null; result?: string | null; image_url?: string | null };

const FALLBACK: CS[] = [
  { client: "A regional D2C brand", challenge: "Stuck at flat sales despite heavy ad spend.", result: "Cut paid spend by 40% while growing revenue 2.3x in 6 months." },
  { client: "A premium service business", challenge: "No clear personal brand for the founder.", result: "Inbound leads grew 5x and average deal size jumped 60%." },
];

export function CaseStudies() {
  const [items, setItems] = useState<CS[]>(FALLBACK);
  useEffect(() => {
    supabase.from("case_studies").select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) setItems(data as CS[]);
    });
  }, []);

  return (
    <section className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Proof</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            Case <span className="text-crimson">Studies</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((c, i) => (
            <article key={i} className="reveal group relative overflow-hidden border border-border bg-background">
              <div className="aspect-[16/9] bg-gradient-to-br from-blood/40 to-background" />
              <div className="p-7">
                <h3 className="font-display text-2xl font-bold uppercase">{c.client}</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Challenge</div>
                    <p className="mt-1 text-sm text-foreground/85">{c.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-crimson">Result</div>
                    <p className="mt-1 text-sm text-foreground">{c.result}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
