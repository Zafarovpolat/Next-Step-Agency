import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import PricingSection from '@/components/pricing-section';
import RoiCalculator from '@/components/roi-calculator';
import CaseStudiesSection from '@/components/case-studies-section';
import LeadCaptureSection from '@/components/lead-capture-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <div
        className="absolute top-0 right-0 -translate-x-1/3 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl -z-0"
        aria-hidden="true"
      />
       <div
        className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl -z-0"
        aria-hidden="true"
      />
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
