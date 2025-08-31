
"use client";

import { useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Check, Minus, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import LeadCaptureCard from '@/components/lead-capture-card';
import { useScrollSmoother } from '@/contexts/gsap-provider';

export default function PricingDetailsPage() {
  const { translations } = useLanguage();
  const { pricingDetailsPage: t, header: headerT } = translations;
  const smoother = useScrollSmoother();

  const features = [
    { feature: t.features.f2, start: true, business: true, premium: true },
    { feature: t.features.f3, start: true, business: true, premium: true },
    { feature: t.features.f4, start: true, business: true, premium: true },
    { feature: t.features.f5, start: true, business: true, premium: true },
    { feature: t.features.f6, start: true, business: true, premium: true },
    { feature: t.features.f7, start: true, business: true, premium: true },
    { feature: t.features.f8, start: true, business: true, premium: true },
    { feature: t.features.f9, start: true, business: true, premium: true },
    { feature: t.features.f10, start: true, business: true, premium: true },
    { feature: t.features.f11, start: false, business: true, premium: true },
    { feature: t.features.f12, start: false, business: true, premium: true },
    { feature: t.features.f13, start: false, business: true, premium: true },
    { feature: t.features.f14, start: false, business: false, premium: true },
    { feature: t.features.f15, start: false, business: false, premium: true },
    { feature: t.features.f16, start: false, business: false, premium: true },
    { feature: t.features.f17, start: false, business: false, premium: true },
    { feature: t.features.f18, start: false, business: false, premium: true },
  ];

  useEffect(() => {
    if (smoother) {
      smoother.scrollTop(0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [smoother]);

  useGSAP(() => {
    gsap.from(".fade-in-element", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <div
        className="absolute top-0 right-0 -translate-x-1/3 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl -z-0"
        aria-hidden="true"
      />
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8 fade-in-element">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t.goBack}
            </Link>
          </div>
          <div className="text-center mb-12 fade-in-element">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
              {t.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-secondary shadow-xl fade-in-element">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/30">
                    <tr>
                      <th scope="col" className="py-3.5 px-4 sm:px-6 text-left text-sm font-semibold text-foreground w-2/5">{t.tableHeaders.features}</th>
                      <th scope="col" className="py-3.5 px-4 sm:px-6 text-center text-sm font-semibold text-foreground w-1/5">{t.tableHeaders.start}</th>
                      <th scope="col" className="py-3.5 px-4 sm:px-6 text-center text-sm font-semibold text-foreground w-1/5">{t.tableHeaders.business}</th>
                      <th scope="col" className="py-3.5 px-4 sm:px-6 text-center text-sm font-semibold text-foreground w-1/5">{t.tableHeaders.premium}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {features.map((item, index) => (
                      <tr key={index} className="hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-4 sm:px-6 text-sm font-medium text-foreground">{item.feature}</td>
                        <td className="py-4 px-4 sm:px-6 text-center">
                          {item.start ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <Minus className="h-5 w-5 text-muted-foreground mx-auto" />}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-center">
                          {item.business ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <Minus className="h-5 w-5 text-muted-foreground mx-auto" />}
                        </td>
                        <td className="py-4 px-4 sm-px-6 text-center">
                          {item.premium ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <Minus className="h-5 w-5 text-muted-foreground mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
           <div className="mt-12 text-center fade-in-element">
             <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">{headerT.getQuote}</Button>
                </DialogTrigger>
                <DialogContent className="p-0 border-none bg-transparent max-w-2xl">
                   <LeadCaptureCard showHeader={true}/>
                </DialogContent>
             </Dialog>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
