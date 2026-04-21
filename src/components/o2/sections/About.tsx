const items = [
  {
    title: "Potential Goals",
    body:
      "We specialize in sustainable organic growth through custom-tailored strategies. Rather than generic ad campaigns, we build your brand's long-term authority with a bespoke roadmap designed to turn your digital presence into a high-impact, permanent asset.",
  },
  {
    title: "Authority-Driven SEO",
    body:
      "We specialize in building long-term search engine dominance through organic optimization. We focus on high-intent keywords and technical excellence to ensure your brand remains at the top of search results consistently.",
  },
  {
    title: "Bespoke Content Ecosystems",
    body:
      "Generic content is noise; tailored content is an asset. We design custom content funnels that speak directly to your specific audience, building trust and converting followers into long-term partners.",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">
            About
          </p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] text-foreground md:text-7xl xl:text-8xl">
            About Our <br className="hidden md:block" />
            <span className="text-crimson">Digital Marketing</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="reveal border-l-2 border-crimson bg-surface p-7 transition-transform hover:-translate-y-1"
            >
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                {it.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
