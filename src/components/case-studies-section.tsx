
"use client"
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Autoplay from "embla-carousel-autoplay"

gsap.registerPlugin(ScrollTrigger);


export default function CaseStudiesSection() {
  const { translations } = useLanguage();
  const { caseStudiesSection: t } = translations;

  useGSAP(() => {
    gsap.from(".case-studies-title", {
      scrollTrigger: {
        trigger: ".case-studies-title",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".case-study-card", {
      scrollTrigger: {
        trigger: ".case-study-card",
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const caseStudies = [
    {
      client: "TechCorp",
      beforeImage: "https://placehold.co/600x400.png",
      beforeHint: "old dashboard",
      afterImage: "https://placehold.co/600x400.png",
      afterHint: "new dashboard",
      kpis: [
        { metric: t.kpis.revenue, value: "+300%", change: "increase" },
        { metric: t.kpis.conversion, value: "+75%", change: "increase" },
        { metric: t.kpis.aov, value: "+50%", change: "increase" },
      ],
      testimonial: t.testimonials.techCorp,
    },
    {
      client: "Innovate LLC",
      beforeImage: "https://placehold.co/600x400.png",
      beforeHint: "outdated website",
      afterImage: "https://placehold.co/600x400.png",
      afterHint: "modern website",
      kpis: [
        { metric: t.kpis.userEngagement, value: "+250%", change: "increase" },
        { metric: t.kpis.leadGen, value: "+120%", change: "increase" },
        { metric: t.kpis.bounceRate, value: "-40%", change: "decrease" },
      ],
      testimonial: t.testimonials.innovate,
    },
    {
      client: "MarketPro",
      beforeImage: "https://placehold.co/600x400.png",
      beforeHint: "low traffic",
      afterImage: "https://placehold.co/600x400.png",
      afterHint: "high traffic",
      kpis: [
        { metric: t.kpis.organicTraffic, value: "+500%", change: "increase" },
        { metric: t.kpis.keywordRankings, value: "+80%", change: "increase" },
        { metric: t.kpis.adSpendROI, value: "+150%", change: "increase" },
      ],
      testimonial: t.testimonials.marketPro,
    },
     {
      client: "DataDriven Inc.",
      beforeImage: "https://placehold.co/600x400.png",
      beforeHint: "complex data",
      afterImage: "https://placehold.co/600x400.png",
      afterHint: "clear visualization",
      kpis: [
        { metric: t.kpis.dataAccuracy, value: "+99%", change: "increase" },
        { metric: t.kpis.reportingTime, value: "-80%", change: "decrease" },
        { metric: t.kpis.decisionMaking, value: "+60%", change: "increase" },
      ],
      testimonial: t.testimonials.dataDriven,
    },
    {
      client: "Global Connect",
      beforeImage: "https://placehold.co/600x400.png",
      beforeHint: "local platform",
      afterImage: "https://placehold.co/600x400.png",
      afterHint: "global platform",
      kpis: [
        { metric: t.kpis.marketExpansion, value: "+200%", change: "increase" },
        { metric: t.kpis.uptime, value: "99.99%", change: "increase" },
        { metric: t.kpis.userBase, value: "+300%", change: "increase" },
      ],
      testimonial: t.testimonials.globalConnect,
    },
  ];

  return (
    <section id="case-studies" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 case-studies-title">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            {t.title}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        
        <div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {caseStudies.map((study, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3 case-study-card">
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-card-foreground">{study.client}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="relative mb-4">
                          <div className="flex justify-between items-center mb-2 text-sm font-semibold">
                            <span>{t.before}</span>
                            <span>{t.after}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Image
                              src={study.beforeImage}
                              alt={`Before shot for ${study.client}`}
                              data-ai-hint={study.beforeHint}
                              width={300}
                              height={200}
                              className="rounded-md object-cover"
                            />
                            <Image
                              src={study.afterImage}
                              alt={`After shot for ${study.client}`}
                              data-ai-hint={study.afterHint}
                              width={300}
                              height={200}
                              className="rounded-md object-cover"
                            />
                          </div>
                        </div>
                        <div className="my-4">
                          <h4 className="font-semibold mb-2 text-card-foreground">{t.kpiHighlights}:</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.kpis.map((kpi, kpiIndex) => (
                              <Badge key={kpiIndex} variant={kpi.change === 'increase' ? 'secondary' : 'destructive'}>
                                {kpi.metric}: <span className="font-bold ml-1">{kpi.value}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary pl-4">
                          "{study.testimonial}"
                        </blockquote>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12 hidden sm:flex" />
            <CarouselNext className="mr-12 hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
