
import dynamic from 'next/dynamic';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import Footer from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-16 sm:py-24">
    <div className="text-center mb-12">
      <Skeleton className="h-12 w-1/2 mx-auto" />
      <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  </div>
);

const PricingSection = dynamic(() => import('@/components/pricing-section'), { 
  ssr: false,
  loading: () => <LoadingSkeleton />,
});
const RoiCalculator = dynamic(() => import('@/components/roi-calculator'), { 
  ssr: false,
  loading: () => <LoadingSkeleton />,
});
const CaseStudiesSection = dynamic(() => import('@/components/case-studies-section'), { 
  ssr: false,
  loading: () => <LoadingSkeleton />,
});
const LeadCaptureSection = dynamic(() => import('@/components/lead-capture-section'), { 
  ssr: false,
  loading: () => <LoadingSkeleton />,
});


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
