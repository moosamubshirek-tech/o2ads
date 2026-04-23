import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@/lib/o2";

const KEY_MAP: Record<string, keyof SiteSettings> = {
  whatsapp_url: "whatsappUrl",
  instagram_url: "instagramUrl",
  facebook_url: "facebookUrl",
  phone_display: "phoneDisplay",
  phone_raw: "phoneRaw",
  email: "email",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let active = true;
    supabase
      .from("site_settings" as never)
      .select("key,value")
      .then(({ data, error }) => {
        if (!active || error || !Array.isArray(data)) return;
        const next = { ...DEFAULT_SITE_SETTINGS };
        data.forEach((row) => {
          const typed = row as { key: string; value: string };
          const settingKey = KEY_MAP[typed.key];
          if (settingKey) next[settingKey] = typed.value;
        });
        setSettings(next);
      });

    return () => {
      active = false;
    };
  }, []);

  return settings;
}