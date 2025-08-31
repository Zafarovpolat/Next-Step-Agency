
"use client";

import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useRef } from 'react';
import { useScrollSmoother } from '../contexts/gsap-provider';

gsap.registerPlugin(ScrollTrigger);

type Plan = 'Starter' | 'Business' | 'Premium';

export default function PricingSection({ setSelectedPlan }: { setSelectedPlan: (plan: Plan) => void }) {
  const { translations } = useLanguage();
  const { pricingSection: t } = translations;
  const container = useRef(null);
  const smoother = useScrollSmoother();

  const handleGetStartedClick = (planName: Plan) => {
    setSelectedPlan(planName);
    const targetElement = document.querySelector("#contact");
    if (!targetElement) return;

    if (smoother) {
        smoother.scrollTo(targetElement, true, "top top");
    } else {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      }
    });

    tl.from(".pricing-title", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(".pricing-card", {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5")
    .from(".more-info-button", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5");

  }, { scope: container });

  const plans: {name: string, key: Plan, price: string, priceDetails: string, description: string, features: string[], isPopular: boolean}[] = [
    {
      name: t.plans.starter.name,
      key: 'Starter',
      price: t.plans.starter.price,
      priceDetails: t.plans.starter.priceDetails,
      description: t.plans.starter.description,
      features: Object.values(t.plans.starter.features),
      isPopular: false,
    },
    {
      name: t.plans.business.name,
      key: 'Business',
      price: t.plans.business.price,
      priceDetails: t.plans.business.priceDetails,
      description: t.plans.business.description,
      features: Object.values(t.plans.business.features),
      isPopular: true,
    },
    {
      name: t.plans.premium.name,
      key: 'Premium',
      price: t.plans.premium.price,
      priceDetails: t.plans.premium.priceDetails,
      description: t.plans.premium.description,
      features: Object.values(t.plans.premium.features),
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-accent/20" ref={container}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 pricing-title">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            {t.title}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="pricing-card">
              <Card
                className={cn(
                  'flex flex-col border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full',
                  plan.isPopular ? 'border-primary shadow-2xl shadow-primary/20' : 'border-border hover:border-primary/50'
                )}
              >
                <CardHeader className="relative">
                  {plan.isPopular && (
                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {t.mostPopular}
                    </div>
                  )}
                  <CardTitle className="text-2xl sm:text-3xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-foreground">{plan.price}</span>
                    {plan.priceDetails && (
                      <p className="text-sm text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: plan.priceDetails }}/>
                    )}
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" variant={plan.isPopular ? 'default' : 'secondary'} onClick={() => handleGetStartedClick(plan.key)}>
                    {t.getStarted}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center more-info-button">
            <Button variant="ghost" size="lg" asChild>
                <Link href="/pricing-details">{t.moreInfo}</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
