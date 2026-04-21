import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";

import { Preloader } from "@/components/o2/Preloader";
import { CustomCursor } from "@/components/o2/CustomCursor";
import { SmoothScroll } from "@/components/o2/SmoothScroll";
import { Navbar } from "@/components/o2/Navbar";
import { Footer } from "@/components/o2/Footer";
import { FloatingWhatsApp } from "@/components/o2/FloatingWhatsApp";
import { Marquee } from "@/components/o2/Marquee";

import { Hero } from "@/components/o2/sections/Hero";
import { About } from "@/components/o2/sections/About";
import { Services } from "@/components/o2/sections/Services";
import { HowWeWork } from "@/components/o2/sections/HowWeWork";
import { MarketingStrategy } from "@/components/o2/sections/MarketingStrategy";
import { Stats } from "@/components/o2/sections/Stats";
import { Portfolio } from "@/components/o2/sections/Portfolio";
import { Results } from "@/components/o2/sections/Results";
import { ConsultationBanner } from "@/components/o2/sections/ConsultationBanner";
import { Testimonials } from "@/components/o2/sections/Testimonials";
import { Team } from "@/components/o2/sections/Team";
import { Pricing } from "@/components/o2/sections/Pricing";
import { CaseStudies } from "@/components/o2/sections/CaseStudies";
import { ClientLogos } from "@/components/o2/sections/ClientLogos";
import { FAQ } from "@/components/o2/sections/FAQ";
import { InstagramFeed } from "@/components/o2/sections/InstagramFeed";
import { Contact } from "@/components/o2/sections/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <CustomCursor />
      <Preloader />
      <div className="grain-overlay" aria-hidden />

      <Navbar />

      <Hero />
      <Marquee />
      <About />
      <Services />
      <HowWeWork />
      <MarketingStrategy />
      <Stats />
      <Portfolio />
      <Results />
      <ConsultationBanner />
      <Testimonials />
      <Team />
      <Pricing />
      <CaseStudies />
      <ClientLogos />
      <FAQ />
      <InstagramFeed />
      <Contact />

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
