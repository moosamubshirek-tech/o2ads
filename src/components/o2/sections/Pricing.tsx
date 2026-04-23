import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

type Tier = { tier_name: string; price: string; features: string[]; is_popular?: boolean | null; display_order?: number | null };

const FALLBACK: Tier[] = [
  { tier_name: "Starter", price: "₹15,000/mo", features: ["8 social posts/month", "Basic SEO setup", "Monthly report", "Email support"] },
  { tier_name: "Growth", price: "₹35,000/mo", is_popular: true, features: ["20 social posts", "Authority SEO + content", "Paid ads management", "Personal branding", "Weekly reports", "Priority support"] },
  { tier_name: "Premium", price: "₹75,000/mo", features: ["Unlimited posts + reels", "Full content ecosystem", "Dedicated ad strategist", "Website + telecom", "Live dashboard", "24/7 manager"] },
];

export function Pricing() {
  const settings = useSiteSettings();
  const [items, setItems] = useState<Tier[]>(FALLBACK);
  useEffect(() => {
    supabase.from("pricing").select("*").order("display_order").then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        setItems(
          data.map((d: any) => ({
            ...d,
            features: Array.isArray(d.features) ? d.features : [],
          })) as Tier[]
        );
      }
    });
  }, []);

  return (
    <section id="pricing" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Plans</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            Pricing
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.tier_name}
              className={`reveal relative border bg-surface p-8 ${
                t.is_popular ? "border-crimson shadow-[0_0_50px_-20px_var(--crimson)]" : "border-border"
              }`}
            >
              {t.is_popular && (
                <span className="absolute -top-3 left-6 bg-crimson px-3 py-1 font-display text-[10px] uppercase tracking-[0.22em]">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-3xl font-bold uppercase">{t.tier_name}</h3>
              <div className="mt-3 font-display text-4xl font-extrabold text-crimson">{t.price}</div>
              <ul className="mt-6 space-y-3">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-7 inline-flex w-full items-center justify-center px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                  t.is_popular ? "bg-crimson text-foreground hover:bg-blood" : "border border-foreground/40 text-foreground hover:border-crimson hover:text-crimson"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
