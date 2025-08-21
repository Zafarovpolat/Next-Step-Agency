import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import PricingSection from '@/components/pricing-section';
import RoiCalculator from '@/components/roi-calculator';
import CaseStudiesSection from '@/components/case-studies-section';
import LeadCaptureSection from '@/components/lead-capture-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PricingSection />
        <RoiCalculator />
        <CaseStudiesSection />
        <LeadCaptureSection />
      </main>
      <Footer />
    </div>
  );
}
