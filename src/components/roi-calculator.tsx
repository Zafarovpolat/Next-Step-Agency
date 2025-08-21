
"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/contexts/language-context';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RoiCalculator() {
  const { translations } = useLanguage();
  const { roiCalculator: t } = translations;

  const [avgCheck, setAvgCheck] = useState(50);
  const [monthlyOrders, setMonthlyOrders] = useState(100);
  const [serviceCost, setServiceCost] = useState(2499);
  const [roi, setRoi] = useState(0);
  const [projectedGrowth] = useState(0.25); // 25% growth assumption

  useGSAP(() => {
    gsap.from(".roi-title", {
      scrollTrigger: {
        trigger: ".roi-title",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".roi-card", {
      scrollTrigger: {
        trigger: ".roi-card",
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const calculateRoi = () => {
      const currentRevenue = avgCheck * monthlyOrders;
      const projectedRevenue = currentRevenue * (1 + projectedGrowth);
      const netGain = projectedRevenue - currentRevenue;
      
      if (serviceCost > 0) {
        const calculatedRoi = ((netGain - serviceCost) / serviceCost) * 100;
        setRoi(calculatedRoi);
      } else {
        setRoi(Infinity);
      }
    };
    calculateRoi();
  }, [avgCheck, monthlyOrders, serviceCost, projectedGrowth]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  return (
    <section id="roi-calculator" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 roi-title">
            <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
                {t.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.subtitle}
            </p>
        </div>
        <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-md border-secondary shadow-lg roi-card">
          <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <Label htmlFor="avg-check" className="text-base">{t.labels.avgCheck}</Label>
                <Input
                  id="avg-check"
                  type="number"
                  value={avgCheck}
                  onChange={(e) => setAvgCheck(Number(e.target.value))}
                  className="mt-2 text-lg dark-glass"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="monthly-orders" className="text-base">{t.labels.monthlyOrders}</Label>
                <Input
                  id="monthly-orders"
                  type="number"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                  className="mt-2 text-lg dark-glass"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="service-cost" className="text-base">{t.labels.serviceCost}</Label>
                <Input
                  id="service-cost"
                  type="number"
                  value={serviceCost}
                  onChange={(e) => setServiceCost(Number(e.target.value))}
                  className="mt-2 text-lg dark-glass"
                  min="0"
                />
              </div>
            </div>
            <div className="text-center bg-accent/50 p-8 rounded-lg">
                <p className="text-muted-foreground text-lg">{t.projectedROI}</p>
                <p className="text-6xl md:text-7xl font-black my-2" style={{color: roi >= 0 ? 'hsl(142 71% 45%)' : 'hsl(0 84% 60%)'}}>
                    {isFinite(roi) ? `${roi.toFixed(0)}%` : '∞'}
                </p>
                <p className="text-muted-foreground">{t.growthProjection.replace('{0}', String(projectedGrowth * 100))}</p>
                <div className='mt-6 text-left space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>{t.netGain}:</span>
                    <span className='font-mono'>{formatCurrency((avgCheck * monthlyOrders * projectedGrowth) - serviceCost)}</span>
                  </div>
                   <div className='flex justify-between'>
                    <span className='text-muted-foreground'>{t.initialInvestment}:</span>
                    <span className='font-mono'>{formatCurrency(serviceCost)}</span>
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <style jsx>{`
        .dark-glass {
            background-color: hsl(var(--brand-blue-1) / 0.5);
            backdrop-filter: blur(4px);
            border-color: hsl(var(--brand-blue-2));
        }
        .dark-glass:focus {
            --tw-ring-color: hsl(var(--primary));
            box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        }
      `}</style>
    </section>
  );
}
