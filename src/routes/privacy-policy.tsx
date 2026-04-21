import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/o2/Navbar";
import { Footer } from "@/components/o2/Footer";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — O2 Ads" },
      { name: "description", content: "How O2 Ads handles the data you share with us through this website." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-32 md:px-8">
        <Link to="/" className="text-xs uppercase tracking-[0.22em] text-crimson hover:underline">← Back home</Link>
        <h1 className="mt-6 font-display text-5xl font-extrabold uppercase md:text-7xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 2026</p>

        <div className="mt-10 space-y-8 text-foreground/85 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold uppercase text-crimson">What we collect</h2>
            <p className="mt-3 text-base">
              When you submit our contact form we collect your name, business name, the service
              you're interested in, your indicative budget, and your message. That's it. We do not
              track personal data through cookies beyond what's required for basic site analytics.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold uppercase text-crimson">How we use it</h2>
            <p className="mt-3 text-base">
              We use this information solely to respond to your enquiry and prepare a tailored
              proposal. We do not sell, rent, or share your data with third parties for marketing.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold uppercase text-crimson">Storage & security</h2>
            <p className="mt-3 text-base">
              Submissions are stored on secure managed infrastructure with strict access controls.
              Only authorised O2 Ads team members can read enquiries.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold uppercase text-crimson">Your rights</h2>
            <p className="mt-3 text-base">
              You can request deletion of your data at any time by writing to{" "}
              <a className="text-crimson underline" href="mailto:official.o2ads@gmail.com">official.o2ads@gmail.com</a>.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
