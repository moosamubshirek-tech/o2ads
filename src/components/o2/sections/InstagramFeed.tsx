import { Instagram } from "lucide-react";
import { O2 } from "@/lib/o2";

// TODO: Replace with Instagram Basic Display API feed
export function InstagramFeed() {
  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Social</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            Follow Us <span className="text-crimson">@{O2.instagram}</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <a
              key={i}
              href={O2.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden border border-border bg-surface"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blood/30 to-transparent" />
              <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="h-8 w-8 text-crimson" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={O2.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-foreground/40 px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] hover:border-crimson hover:text-crimson"
          >
            <Instagram className="h-4 w-4" /> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
