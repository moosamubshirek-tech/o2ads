const ITEMS = [
  "SOCIAL MEDIA",
  "PERSONAL BRANDING",
  "ADS",
  "AUTHORITY SEO",
  "TREND VIDEOS",
  "WEBSITE CREATION",
  "TELECOM SERVICES",
  "WEEKLY ANALYSIS",
];

export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center gap-10">
          <span className="font-display text-base font-bold uppercase tracking-[0.18em] text-white md:text-lg">
            {t}
          </span>
          <span className="text-white/70">·</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden bg-crimson py-3 md:py-4">
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
