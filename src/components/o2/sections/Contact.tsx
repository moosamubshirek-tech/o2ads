import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { O2 } from "@/lib/o2";
import { toast } from "sonner";
import { Instagram, MessageCircle, Mail, Phone, Loader2 } from "lucide-react";

const SERVICES = [
  "Social Media Management", "Personal Branding", "Paid Ads", "Authority SEO",
  "Trend Videos", "Website Creation", "Telecom Services", "Full Package",
];
const BUDGETS = ["< ₹15k / mo", "₹15k – 35k / mo", "₹35k – 75k / mo", "₹75k+ / mo"];

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", business_name: "", email: "", service: SERVICES[0], budget: BUDGETS[0], message: "",
  });

  const set = (k: keyof typeof form) => (e: any) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please add your name, email, and a message.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: form.full_name,
      business_name: form.business_name || null,
      email: form.email,
      service: form.service,
      budget: form.budget,
      message: form.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Try WhatsApp instead.");
      return;
    }
    toast.success("Message received. We'll be in touch within hours.");
    setForm({ full_name: "", business_name: "", email: "", service: SERVICES[0], budget: BUDGETS[0], message: "" });
  };

  const inputCls = "w-full bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-crimson transition-colors";

  return (
    <section id="contact" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Get In Touch</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            Contact <span className="text-crimson">Us</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <form onSubmit={onSubmit} className="reveal space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input className={inputCls} placeholder="Full Name *" value={form.full_name} onChange={set("full_name")} />
              <input className={inputCls} placeholder="Business Name" value={form.business_name} onChange={set("business_name")} />
            </div>
            <input className={inputCls} type="email" placeholder="Email *" value={form.email} onChange={set("email")} />
            <div className="grid gap-4 md:grid-cols-2">
              <select className={inputCls} value={form.service} onChange={set("service")}>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select className={inputCls} value={form.budget} onChange={set("budget")}>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <textarea className={`${inputCls} min-h-[140px] resize-y`} placeholder="Tell us about your project *" value={form.message} onChange={set("message")} />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-crimson px-7 py-4 font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-blood disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Send Message
            </button>
          </form>

          <aside className="reveal space-y-5">
            <ContactRow icon={<Instagram className="h-5 w-5" />} label="Instagram" value={`@${O2.instagram}`} href={O2.instagramUrl} />
            <ContactRow icon={<Phone className="h-5 w-5" />} label="Phone" value={O2.phone} href={`tel:${O2.phoneRaw}`} />
            <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value={O2.email} href={`mailto:${O2.email}`} />
            <a
              href={O2.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-3 bg-[#25D366] px-6 py-5 font-display text-base font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 border border-border bg-surface p-5 hover:border-crimson">
      <div className="grid h-11 w-11 place-items-center border border-border text-crimson group-hover:border-crimson">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
        <div className="font-display text-base font-bold tracking-wider text-foreground">{value}</div>
      </div>
    </a>
  );
}
