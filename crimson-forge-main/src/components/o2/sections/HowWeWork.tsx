const steps = [
  { n: "01", title: "Discovery", body: "We deep-dive into your brand, audience, and competitors to understand your unique position." },
  { n: "02", title: "Strategy", body: "We craft a bespoke roadmap tailored to your goals, not a generic playbook." },
  { n: "03", title: "Execute", body: "Our team brings the strategy to life with precision, creativity, and speed." },
  { n: "04", title: "Report", body: "Weekly and monthly performance reports with clear metrics and next steps." },
];

export function HowWeWork() {
  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Process</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            How <span className="text-crimson">We Work</span>
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-border md:block" />
          {steps.map((s) => (
            <div key={s.n} className="reveal relative">
              <div className="font-display text-6xl font-extrabold leading-none text-crimson md:text-7xl">
                {s.n}
              </div>
              <div className="mt-2 h-px w-12 bg-crimson" />
              <h3 className="mt-4 font-display text-2xl font-bold uppercase">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
