export const O2 = {
  name: "O2 Ads",
  tagline: "We Don't Run Ads. We Build Brands.",
  instagram: "o2_ads",
  instagramUrl: "https://instagram.com/o2_ads",
  facebookUrl: "",
  phone: "+91 81297 69545",
  phoneRaw: "+918129769545",
  email: "official.o2ads@gmail.com",
  whatsapp: "https://wa.me/918129769545",
} as const;

export type SiteSettings = {
  whatsappUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  phoneDisplay: string;
  phoneRaw: string;
  email: string;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  whatsappUrl: O2.whatsapp,
  instagramUrl: O2.instagramUrl,
  facebookUrl: O2.facebookUrl,
  phoneDisplay: O2.phone,
  phoneRaw: O2.phoneRaw,
  email: O2.email,
};

export function instagramHandle(url: string) {
  try {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, "");
    return path || O2.instagram;
  } catch {
    return url.replace(/^@/, "") || O2.instagram;
  }
}
