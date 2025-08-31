
"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeadCaptureCard from './lead-capture-card';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Plan = 'Starter' | 'Business' | 'Premium' | '';

export default function LeadCaptureSection({
  selectedPlan,
  setSelectedPlan
}: {
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
}) {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".lead-capture-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section id="contact" className="py-16 sm:py-24 bg-accent/30 relative overflow-hidden" ref={container}>
       <div className="absolute inset-0 bg-grid-pattern-small opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
            <LeadCaptureCard 
              className='lead-capture-card' 
              showHeader={true} 
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
        </div>
      </div>
      <style jsx>{`
        .bg-grid-pattern-small {
          background-image: linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px);
          background-size: 1.5rem 1.5rem;
        }
      `}</style>
    </section>
  );
}
