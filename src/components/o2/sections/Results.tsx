export function Results() {
  return (
    <section id="results" className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Results</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            Results Speak <br /> More Than <span className="text-crimson">Words</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Our approach is validated by data, consistently delivering high-performance engagement
            at a fraction of the industry average cost.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <div className="reveal border border-border bg-background p-7">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span>Campaign 01</span>
              <span className="text-crimson">Live Results</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Metric value="151" label="Conversations" />
              <Metric value="₹2.74" label="Per Conversation" accent />
              <Metric value="₹413.68" label="Total Spend" />
            </div>
            <div className="mt-6 h-px bg-border" />
            <p className="mt-4 text-sm text-muted-foreground">
              High-intent messaging campaign optimized for low CPA. Beat the industry average by a wide margin.
            </p>
          </div>

          {/* Card 2 */}
          <div className="reveal border border-crimson bg-background p-7">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span>Campaign 02</span>
              <span className="text-crimson">27% Below Median</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Metric value="56" label="Conversations" />
              <Metric value="₹7.57" label="Per Conversation" accent />
              <Metric value="₹423.73" label="Total Spend" />
            </div>
            <div className="mt-6 h-px bg-border" />
            <p className="mt-4 text-sm text-muted-foreground">
              Industry median: <span className="text-foreground font-semibold">₹10.41</span> per conversation. We delivered <span className="text-crimson font-semibold">27% lower</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div>
      <div className={`font-display text-3xl font-extrabold leading-none md:text-4xl ${accent ? "text-crimson" : "text-foreground"}`}>
        {value}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
