import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_SITE_SETTINGS } from "@/lib/o2";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — O2 Ads Admin" }] }),
  component: SettingsPage,
});

const FIELDS = [
  { key: "whatsapp_url", label: "WhatsApp number/link", placeholder: DEFAULT_SITE_SETTINGS.whatsappUrl },
  { key: "instagram_url", label: "Instagram", placeholder: DEFAULT_SITE_SETTINGS.instagramUrl },
  { key: "facebook_url", label: "Facebook", placeholder: "https://facebook.com/o2ads" },
  { key: "phone_display", label: "Phone display", placeholder: DEFAULT_SITE_SETTINGS.phoneDisplay },
  { key: "phone_raw", label: "Phone dial link", placeholder: DEFAULT_SITE_SETTINGS.phoneRaw },
  { key: "email", label: "Email", placeholder: DEFAULT_SITE_SETTINGS.email },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];
type SettingsForm = Record<FieldKey, string>;

const DEFAULT_FORM: SettingsForm = {
  whatsapp_url: DEFAULT_SITE_SETTINGS.whatsappUrl,
  instagram_url: DEFAULT_SITE_SETTINGS.instagramUrl,
  facebook_url: DEFAULT_SITE_SETTINGS.facebookUrl,
  phone_display: DEFAULT_SITE_SETTINGS.phoneDisplay,
  phone_raw: DEFAULT_SITE_SETTINGS.phoneRaw,
  email: DEFAULT_SITE_SETTINGS.email,
};

function SettingsPage() {
  const [form, setForm] = useState<SettingsForm>(DEFAULT_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_settings" as never)
      .select("key,value")
      .then(({ data, error }) => {
        setLoading(false);
        if (error) {
          toast.error(error.message);
          return;
        }

        const next = { ...DEFAULT_FORM };
        if (Array.isArray(data)) {
          data.forEach((row) => {
            const typed = row as { key: string; value: string };
            if (typed.key in next) next[typed.key as FieldKey] = typed.value;
          });
        }
        setForm(next);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    const rows = FIELDS.map((field) => ({ key: field.key, value: form[field.key].trim() }));
    const { error } = await supabase.from("site_settings" as never).upsert(rows as never, { onConflict: "key" });
    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Settings saved.");
  };

  const inputCls = "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-crimson focus:outline-none";

  return (
    <div>
      <div className="mb-8">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Settings</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase tracking-wider">Social Links</h1>
        <p className="mt-2 text-sm text-muted-foreground">Update the contact and social links used across the website.</p>
      </div>

      {loading ? (
        <div className="grid min-h-[260px] place-items-center">
          <Loader2 className="h-6 w-6 animate-spin text-crimson" />
        </div>
      ) : (
        <div className="max-w-2xl border border-border bg-surface p-4 sm:p-6">
          <div className="space-y-4">
            {FIELDS.map((field) => (
              <label key={field.key} className="block">
                <span className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{field.label}</span>
                <input
                  className={inputCls}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                />
              </label>
            ))}
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-crimson px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground hover:bg-blood disabled:opacity-60 sm:w-auto"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
}