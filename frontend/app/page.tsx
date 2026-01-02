import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { AboutSection } from "@/components/landing/AboutSection";
import { CTASection } from "@/components/landing/CTASection";
import { FallingLeavesBackground } from "@/components/ui/FallingLeavesBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen selection:bg-nature-500/30 pt-16">
        <HeroSection />

        {/* Unified Section for Seamless Transition */}
        <div className="relative bg-[#0f110f] overflow-hidden">
          {/* Continuous Background Effects */}
          <FallingLeavesBackground />

          <FeaturesGrid />
          <AboutSection />
          <CTASection />
        </div>
      </div>
      <Footer />
    </>
  );
}
