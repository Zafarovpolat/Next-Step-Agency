import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    price: '$999',
    description: 'For new businesses and startups ready to make their mark.',
    features: [
      'Custom Landing Page',
      'SEO Basics',
      'Mobile-Responsive Design',
      'Basic Analytics',
    ],
    isPopular: false,
  },
  {
    name: 'Business',
    price: '$2,499',
    description: 'For growing businesses aiming to scale and optimize.',
    features: [
      'Multi-page Website (up to 10 pages)',
      'Advanced SEO & Content Strategy',
      'CMS Integration',
      'Lead Capture Forms',
      'Monthly Performance Reports',
    ],
    isPopular: true,
  },
  {
    name: 'Premium',
    price: 'Contact Us',
    description: 'For established enterprises requiring a full-service solution.',
    features: [
      'Custom Web Application',
      'E-commerce Functionality',
      'API Integrations',
      'Dedicated Account Manager',
      '24/7 Priority Support',
    ],
    isPopular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            Clear Pricing, Powerful Results
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your ambition. No hidden fees, just transparent partnership.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'flex flex-col border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2',
                plan.isPopular ? 'border-primary shadow-2xl shadow-primary/20' : 'border-border hover:border-primary/50'
              )}
            >
              <CardHeader className="relative">
                {plan.isPopular && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
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
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
