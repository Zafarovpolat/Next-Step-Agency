
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

gsap.registerPlugin(ScrollTrigger);

export default function PricingSection() {
  const { translations } = useLanguage();
  const { pricingSection: t } = translations;

  useGSAP(() => {
    gsap.from(".pricing-title", {
      scrollTrigger: {
        trigger: ".pricing-title",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".pricing-card", {
      scrollTrigger: {
        trigger: ".pricing-card",
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    });

     gsap.from(".more-info-button", {
      scrollTrigger: {
        trigger: ".more-info-button",
        start: "top 90%",
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const plans = [
    {
      name: t.plans.starter.name,
      price: '$999',
      description: t.plans.starter.description,
      features: [
        t.plans.starter.features.landingPage,
        t.plans.starter.features.seo,
        t.plans.starter.features.responsive,
        t.plans.starter.features.analytics,
      ],
      isPopular: false,
    },
    {
      name: t.plans.business.name,
      price: '$2,499',
      description: t.plans.business.description,
      features: [
        t.plans.business.features.multiPage,
        t.plans.business.features.advancedSeo,
        t.plans.business.features.cms,
        t.plans.business.features.leadCapture,
        t.plans.business.features.reports,
      ],
      isPopular: true,
    },
    {
      name: t.plans.premium.name,
      price: t.plans.premium.price,
      description: t.plans.premium.description,
      features: [
        t.plans.premium.features.customApp,
        t.plans.premium.features.ecommerce,
        t.plans.premium.features.api,
        t.plans.premium.features.accountManager,
        t.plans.premium.features.support,
      ],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-accent/20">
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
                  <div className="text-3xl sm:text-4xl font-extrabold mb-6 text-foreground">{plan.price}</div>
                  <ul className="space-y-3 text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" variant={plan.isPopular ? 'default' : 'secondary'}>
                    {t.getStarted}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center more-info-button">
            <Button variant="link" asChild>
                <Link href="/pricing-details">{t.moreInfo}</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
