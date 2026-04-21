import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const TILES = [
  { to: "/admin/testimonials", label: "Testimonials", table: "testimonials" as const },
  { to: "/admin/team", label: "Team", table: "team" as const },
  { to: "/admin/pricing", label: "Pricing", table: "pricing" as const },
  { to: "/admin/case-studies", label: "Case Studies", table: "case_studies" as const },
  { to: "/admin/client-logos", label: "Client Logos", table: "client_logos" as const },
  { to: "/admin/portfolio", label: "Portfolio", table: "portfolio" as const },
  { to: "/admin/submissions", label: "Submissions", table: "contact_submissions" as const },
];

function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    Promise.all(
      TILES.map(async (t) => {
        const { count } = await supabase.from(t.table).select("*", { count: "exact", head: true });
        return [t.table, count ?? 0] as const;
      })
    ).then((entries) => setCounts(Object.fromEntries(entries)));
  }, []);

  return (
    <div>
      <h1 className="font-display text-4xl font-extrabold uppercase tracking-wider text-foreground">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Manage all O2 Ads content from one place.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <Link key={t.to} to={t.to} className="group block border border-border bg-surface p-6 transition-colors hover:border-crimson">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t.label}</div>
            <div className="mt-3 font-display text-5xl font-extrabold text-foreground group-hover:text-crimson">
              {counts[t.table] ?? "—"}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">records</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
