import { HeroSection } from "@/components/landing/hero-section";
import { ProgramsSection } from "@/components/landing/programs-section";
import WhySection from "@/components/landing/why-section";
import { ImpactSection } from "@/components/landing/Impact";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <HeroSection />

        <WhySection />

        <ProgramsSection />
        <ImpactSection />
      </main>
    </div>
  );
}
