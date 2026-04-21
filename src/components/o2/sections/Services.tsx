import {
  Image as ImageIcon, Video, User, Megaphone, Hash, Phone, BarChart3, Globe,
} from "lucide-react";

const services = [
  { icon: ImageIcon, title: "Creative Posters", body: "High-impact visuals tailored to your brand identity and current trends." },
  { icon: Video, title: "Trend-Based Videos", body: "Content that captures cultural momentum and drives organic reach." },
  { icon: User, title: "Personal Branding", body: "Humanize your business and establish you as an industry authority." },
  { icon: Megaphone, title: "Paid Ads", body: "Surgical ad campaigns with industry-low cost per conversation." },
  { icon: Hash, title: "Social Media Management", body: "Full-service management of your brand's social presence." },
  { icon: Phone, title: "Telecom Services", body: "Communication solutions to keep your business connected." },
  { icon: BarChart3, title: "Weekly & Monthly Analysis", body: "Data-driven reports tracking every metric that matters." },
  { icon: Globe, title: "Website Creation & Management", body: "Custom websites built to convert visitors into clients." },
];

export function Services() {
  return (
    <section id="services" className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="reveal flex items-end justify-between gap-8">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">Services</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] text-foreground md:text-7xl">
              What Do We <span className="text-crimson">Provide</span>
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Eight pillars. One mission — to build brands that compound, not just campaigns that spike.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="reveal group relative overflow-hidden border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-crimson"
              style={{ boxShadow: "inset 0 0 0 0 transparent" }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-crimson/0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="grid h-12 w-12 place-items-center border border-border text-crimson group-hover:border-crimson group-hover:bg-crimson/10">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold uppercase text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              <div className="mt-6 h-px w-10 bg-crimson transition-all group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
