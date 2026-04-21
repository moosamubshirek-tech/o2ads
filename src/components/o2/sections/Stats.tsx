import { useCounter } from "@/hooks/use-counter";

function Stat({ end, suffix, prefix, label, decimals = 0 }: {
  end: number; suffix?: string; prefix?: string; label: string; decimals?: number;
}) {
  const { ref, value } = useCounter(end, 1800, decimals);
  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-display text-5xl font-extrabold leading-none text-white md:text-7xl">
        {prefix}{value}{suffix}
      </div>
      <div className="mt-3 font-display text-xs uppercase tracking-[0.22em] text-white/85">
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="bg-crimson py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4 md:px-8">
        <Stat end={50} suffix="+" label="Clients Served" />
        <Stat end={27} suffix="%" label="Lower Ad Cost vs Industry" />
        <Stat end={2.74} prefix="₹" decimals={2} label="Avg Cost / Conversation" />
        <Stat end={151} suffix="+" label="Conversations Generated" />
      </div>
    </section>
  );
}
