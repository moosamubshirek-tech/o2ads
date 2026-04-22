import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const FALLBACK_IMAGES = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio1, portfolio2];

const FALLBACK = [
  { title: "Lumen Social Refresh", category: "Social Media", description: "Full social identity overhaul." },
  { title: "Saffron Brand Posters", category: "Branding", description: "Bold brutalist posters." },
  { title: "Northwind Identity", category: "Branding", description: "Premium real estate identity." },
  { title: "Velura Trend Reels", category: "Social Media", description: "1.2M organic short-form reach." },
  { title: "Atlas Performance Ads", category: "Ads", description: "₹2.74 cost per conversation." },
  { title: "Studio Nine Posters", category: "Posters", description: "Editorial poster set." },
];

const CATS = ["All", "Social Media", "Ads", "Branding", "Posters"];

type Item = { title: string; category: string; image_url?: string | null; description?: string | null };

export function Portfolio() {
  const [items, setItems] = useState<Item[]>(FALLBACK);
  const [filter, setFilter] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("portfolio")
      .select("title,category,image_url,description")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data && data.length > 0) setItems(data as Item[]);
      });
    return () => { cancelled = true; };
  }, []);

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  // Drag-to-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const onDown = (e: PointerEvent) => {
      isDown = true; startX = e.clientX; scrollLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      el.scrollLeft = scrollLeft - (e.clientX - startX);
    };
    const onUp = () => { isDown = false; };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  // Wheel to horizontal
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section id="works" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Portfolio</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
              Our <span className="text-crimson">Works</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 font-display text-xs uppercase tracking-[0.18em] border transition-colors ${
                  filter === c ? "border-crimson bg-crimson text-foreground" : "border-border text-muted-foreground hover:border-crimson hover:text-crimson"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-12 flex w-full gap-5 overflow-x-auto px-6 pb-6 md:px-8 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none" }}
      >
        {filtered.map((it, i) => {
          const img = it.image_url && it.image_url.startsWith("http") ? it.image_url : FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
          return (
            <div
              key={`${it.title}-${i}`}
              className="portfolio-card group relative shrink-0 overflow-hidden border border-border"
              style={{ width: "min(80vw, 420px)", aspectRatio: "4/5" }}
            >
              <img
                src={img}
                alt={it.title}
                loading="lazy"
                className="portfolio-img h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="inline-block bg-crimson px-2 py-1 font-display text-[10px] uppercase tracking-[0.18em]">
                  {it.category}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase text-foreground">
                  {it.title}
                </h3>
                {it.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{it.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
