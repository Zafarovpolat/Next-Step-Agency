"use client";
import Link from 'next/link';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/language-context';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function HeroSection() {
  const { translations } = useLanguage();
  const { heroSection: t } = translations;

  useGSAP(() => {
    gsap.from(".hero-element", {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5
    });
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-background z-10">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-glow blur-[150px] opacity-20"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-glow blur-[150px] opacity-20"></div>
        </div>
      <div className="container mx-auto px-4 z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground hero-element">
            {t.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto hero-element">
            {t.subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-4 hero-element">
            <Button size="lg" asChild>
              <Link href="#pricing">{t.explorePlans}</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="#case-studies">{t.seeOurWork}</Link>
            </Button>
          </div>
        </div>
      </div>
       <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, hsl(var(--background)) 1px);
          background-size: 2rem 2rem;
        }
        .bg-blue-glow {
            background-color: hsl(var(--primary) / 0.5);
        }
      `}</style>
    </section>
  );
}
