import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Quote } from "lucide-react";

type T = { name: string; role?: string | null; company?: string | null; quote: string; avatar_url?: string | null };

const FALLBACK: T[] = [
  { name: "Arjun Mehta", role: "Founder", company: "Lumen Studios", quote: "O2 Ads completely changed how our brand shows up online." },
  { name: "Priya Nair", role: "Marketing Head", company: "Saffron & Co.", quote: "Their bespoke content strategy doubled our engagement in three months." },
  { name: "Rohan Kapoor", role: "CEO", company: "Northwind Realty", quote: "The cost-per-conversation we get with O2 Ads is unreal. Easy 10/10." },
];

export function Testimonials() {
  const [items, setItems] = useState<T[]>(FALLBACK);

  useEffect(() => {
    supabase.from("testimonials").select("*").then(({ data, error }) => {
      if (!error && data && data.length > 0) setItems(data as T[]);
    });
  }, []);

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Voices</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            What Clients <span className="text-crimson">Say</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.slice(0, 6).map((t, i) => (
            <div key={i} className="reveal border border-border bg-surface p-7">
              <Quote className="h-7 w-7 text-crimson" />
              <p className="mt-4 text-base leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-crimson font-display font-bold text-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-sm font-bold uppercase tracking-wider">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role}{t.company ? ` · ${t.company}` : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
