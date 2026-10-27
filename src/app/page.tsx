import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHomeHero } from "@/components/marketing/marketing-home-hero";
import { DashboardConcepts } from "@/components/marketing/dashboard-concepts";
import { ConciseFeatures, ConciseFinalCTA, ConciseHowItWorks } from "@/components/marketing/marketing-home-sections";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <MarketingHeader />
      <main className="flex-1">
        <MarketingHomeHero />
        <DashboardConcepts />
        <ConciseFeatures />
        <ConciseHowItWorks />
        <ConciseFinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}
