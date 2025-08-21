
"use client";
import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/language-context';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useScrollSmoother } from '@/contexts/gsap-provider';


export default function HeroSection() {
  const { translations } = useLanguage();
  const { heroSection: t } = translations;
  const heroRef = useRef<HTMLDivElement>(null);
  const smoother = useScrollSmoother();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (smoother) {
        smoother.scrollTo(target, true, "top top");
    }
  }

  useGSAP(() => {
    gsap.from(".hero-element", {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.5
    });

  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative w-full h-[calc(100vh_-_4rem)] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-background z-10">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground hero-element pb-2">
            {t.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto hero-element">
            {t.subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-4 hero-element">
            <Button size="lg" asChild>
              <a href="#pricing" onClick={(e) => handleScroll(e, "#pricing")}>{t.explorePlans}</a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#case-studies" onClick={(e) => handleScroll(e, "#case-studies")}>{t.seeOurWork}</a>
            </Button>
          </div>
        </div>
      </div>
       <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, hsl(var(--background)) 1px);
          background-size: 2rem 2rem;
        }
      `}</style>
    </section>
  );
}
