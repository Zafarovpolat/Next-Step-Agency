"use client";

import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useRef } from 'react';

export default function PricingSection() {
  const { translations } = useLanguage();
  const { pricingSection: t } = translations;

  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

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
    <section id="pricing" ref={sectionRef} className="py-16 sm:py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={cn("text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground slide-in-from-bottom", isVisible && "in-view")}>
            {t.title}
          </h2>
          <p className={cn("mt-4 text-lg text-muted-foreground max-w-2xl mx-auto slide-in-from-bottom-1", isVisible && "in-view")}>
            {t.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={plan.name} className={cn(`slide-in-from-bottom-${index + 1}`, isVisible && "in-view")}>
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
                  <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-extrabold mb-6 text-foreground">{plan.price}</div>
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
      </div>
    </section>
  );
}
