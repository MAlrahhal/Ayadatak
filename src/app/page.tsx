import { MarketingHeader } from "@/components/marketing/marketing-header";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { TemplatePresentation } from "@/components/marketing/template-presentation";
import { FinalCTA } from "@/components/marketing/final-cta";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { SpecialtiesStrip } from "@/components/marketing/specialties-strip";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MarketingHeader />
      <main className="flex-1">
        <Hero />
        <SpecialtiesStrip />
        <TemplatePresentation />
        <HowItWorks />
        <Features />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}
