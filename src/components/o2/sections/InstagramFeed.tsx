import { Instagram } from "lucide-react";
import { instagramHandle } from "@/lib/o2";
import { useSiteSettings } from "@/hooks/use-site-settings";

// TODO: Replace with Instagram Basic Display API feed
export function InstagramFeed() {
  const settings = useSiteSettings();
  const handle = instagramHandle(settings.instagramUrl);

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Social</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            Follow Us <span className="text-crimson">@{handle}</span>
          </h2>
        </div>

        <div className="reveal mt-12 border border-border bg-surface p-8 text-center md:p-12">
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Follow us on Instagram for daily brand inspiration, trend content, and behind-the-scenes looks at what we build.
          </p>
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-crimson px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground hover:bg-blood"
          >
            <Instagram className="h-4 w-4" /> Follow @{handle}
          </a>
        </div>
      </div>
    </section>
  );
}
