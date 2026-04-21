import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What services does O2 Ads offer?", a: "We offer creative posters, trend-based videos, personal branding, paid ads, social media management, telecom services, weekly/monthly analysis, and website creation & management." },
  { q: "How is O2 Ads different from other agencies?", a: "We don't run cookie-cutter campaigns. We build long-term organic authority and personal brands that compound — not paid spikes that disappear when budgets pause." },
  { q: "Do you work with small businesses?", a: "Absolutely. We tailor scope and pricing to where you are now, with a roadmap to scale as you grow." },
  { q: "How long before I see results?", a: "Paid campaigns can show traction in days. Organic authority and SEO compound over 60–120 days. We send weekly progress reports throughout." },
  { q: "What does a typical engagement look like?", a: "Discovery → Strategy → Execute → Report. Most clients work with us on a monthly retainer with clearly defined deliverables." },
  { q: "How do I get started?", a: "Tap any 'Chat on WhatsApp' button, or fill out the contact form below. We'll respond within a few hours and book a free consultation." },
];

export function FAQ() {
  return (
    <section className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="reveal">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-crimson">FAQ</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-6xl">
            Frequently Asked <br /> <span className="text-crimson">Questions</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="reveal mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="font-display text-base font-bold uppercase tracking-wider text-foreground hover:text-crimson md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
