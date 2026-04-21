import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/submissions")({
  component: SubmissionsPage,
});

type Submission = {
  id: string;
  full_name: string;
  business_name: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  created_at: string | null;
};

function SubmissionsPage() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      setLoading(false);
      if (error) return toast.error(error.message);
      setRows((data as Submission[]) || []);
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold uppercase tracking-wider text-foreground">Contact Submissions</h1>
      <p className="mt-2 text-sm text-muted-foreground">Read-only inbox of leads from the contact form.</p>

      <div className="mt-6 border border-border bg-surface">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">No submissions yet.</div>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((r) => (
              <li key={r.id} className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-display text-lg font-bold uppercase tracking-wider text-foreground">{r.full_name}</span>
                    {r.business_name && <span className="ml-2 text-sm text-muted-foreground">· {r.business_name}</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{r.created_at && new Date(r.created_at).toLocaleString()}</div>
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.22em] text-crimson">
                  {r.service && <span>Service: {r.service}</span>}
                  {r.budget && <span>Budget: {r.budget}</span>}
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{r.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
