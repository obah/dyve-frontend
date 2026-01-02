import { HeroSection } from "./components/landing/HeroSection";
import { PainPointSection } from "./components/landing/PainPointSection";
import { FeatureShowcase } from "./components/landing/FeatureShowcase";
import { ComingSoonSection } from "./components/landing/ComingSoonSection";
import { TrustSection } from "./components/landing/TrustSection";
import { Footer } from "./components/landing/Footer";
import { Navbar } from "./components/landing/Navbar";

export default function Home() {
  return (
    <main className="selection:bg-primary/20 min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <PainPointSection />
      <FeatureShowcase />
      <ComingSoonSection />
      <TrustSection />
      <Footer />
    </main>
  );
}
