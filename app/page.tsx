import ContributeBanner from "@/components/web/shared/contribute-banner";
import DonationBanner from "@/components/web/shared/donation-banner";
import FeatureCards from "@/components/web/shared/feature-card";
import { LatestAdd } from "@/components/web/homepage/latest-additions";
import { StatsSection } from "@/components/web/homepage/stats";
import TopContributors from "@/components/web/homepage/top-contributors";
import { HeroSection } from "@/components/web/homepage/hero";


{/*TO-DO:
  NAVBAR: Hamburger Menu for mobile
  HERO: implement search engine
  STATS: -
  LATESTADDITIONS: Fix Carousel's arrows, implement link to dogs
  CONTRIBUTE & TOP: implement link to profile
  TOOLS: -
  DONATION: implement link to donation
  */}
export default function Home() {
  return (
    <div>
      <HeroSection />

      <div className="p-12 lg:p-24 flex flex-col justify-center gap-18">
        <StatsSection />
        <LatestAdd />

        <div className="my-14 grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">
            <ContributeBanner />
          </div>

          <div className="lg:col-span-1">
            <TopContributors />
          </div>

        </div>

        <FeatureCards />
        <DonationBanner />
      </div>

    </div>

  );
}
