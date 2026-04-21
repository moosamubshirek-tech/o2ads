import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Member = { name: string; role: string; bio?: string | null; photo_url?: string | null; display_order?: number | null };

const FALLBACK: Member[] = [
  { name: "Aarav Sharma", role: "Founder & Strategist", bio: "Builds brands that mean something. Obsessed with organic growth." },
  { name: "Neha Iyer", role: "Head of Content", bio: "Crafts content that turns scrollers into customers." },
  { name: "Karan Verma", role: "Performance Lead", bio: "Engineers ad campaigns with surgical precision." },
];

export function Team() {
  const [items, setItems] = useState<Member[]>(FALLBACK);
  useEffect(() => {
    supabase.from("team").select("*").order("display_order").then(({ data, error }) => {
      if (!error && data && data.length > 0) setItems(data as Member[]);
    });
  }, []);

  return (
    <section className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Team</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            Meet The <span className="text-crimson">Team</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((m, i) => (
            <div key={i} className="reveal group">
              <div className="relative aspect-[4/5] overflow-hidden border border-border bg-background">
                {m.photo_url ? (
                  <img src={m.photo_url} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full w-full place-items-center font-display text-7xl font-extrabold text-crimson/30">
                    {m.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="mt-4">
                <h3 className="font-display text-xl font-bold uppercase">{m.name}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-crimson">{m.role}</p>
                {m.bio && <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
